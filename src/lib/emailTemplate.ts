import fs from 'fs';
import path from 'path';
import { RsvpGuest } from '../types';
import { uploadToCloudinary } from './cloudinary';

let cachedCloudinaryCouplePhotoUrl: string | null = null;

async function getCloudinaryCouplePhotoUrl(baseUrl: string): Promise<string> {
  if (cachedCloudinaryCouplePhotoUrl) {
    return cachedCloudinaryCouplePhotoUrl;
  }

  const fallbackUrl = `${baseUrl.replace(/\/$/, '')}/src/assets/images/carol_and_john_portrait_1784461506194.jpg`;

  try {
    let dataUrl: string | null = null;
    const localPath = path.join(process.cwd(), 'src/assets/images/carol_and_john_portrait_1784461506194.jpg');

    if (fs.existsSync(localPath)) {
      const fileBuffer = fs.readFileSync(localPath);
      dataUrl = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
    }

    if (dataUrl) {
      const uploadedUrl = await uploadToCloudinary(dataUrl);
      if (uploadedUrl) {
        cachedCloudinaryCouplePhotoUrl = uploadedUrl;
        console.log('Successfully uploaded header couple photo to Cloudinary:', uploadedUrl);
        return uploadedUrl;
      }
    }
  } catch (err) {
    console.warn('Could not upload header couple photo to Cloudinary, using fallback:', err);
  }

  return fallbackUrl;
}

async function getCloudinaryQrCodeUrl(guest: RsvpGuest): Promise<string> {
  const rawQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `SANDRA-SAMUEL-RSVP-${guest.id}-${guest.fullName}`
  )}&color=722f37&bgcolor=FCFAF7`;

  try {
    const response = await fetch(rawQrUrl);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = response.headers.get('content-type') || 'image/png';
      const qrDataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

      const uploadedUrl = await uploadToCloudinary(qrDataUrl);
      if (uploadedUrl) {
        console.log(`Successfully uploaded guest (${guest.fullName}) QR code to Cloudinary:`, uploadedUrl);
        return uploadedUrl;
      }
    }
  } catch (err) {
    console.warn('Could not upload QR code to Cloudinary, falling back to raw QR URL:', err);
  }

  return rawQrUrl;
}

export async function generateRsvpEmailHtml(guest: RsvpGuest, baseUrl: string = 'https://sandraandsamuel.wedding'): Promise<string> {
  const qrCodeUrl = await getCloudinaryQrCodeUrl(guest);
  const couplePhotoUrl = await getCloudinaryCouplePhotoUrl(baseUrl);
  
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=All+Saints+Cathedral+Nairobi';
  
  const googleCalendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sandra+%26+Samuel+Wedding&dates=20261017T060000Z/20261017T150000Z&details=Official+Wedding+Celebration+for+Sandra+Chepchumba+Kiptoo+%26+Samuel+Ochieng+Okello.&location=All+Saints+Cathedral+Church%2C+Kenyatta+Ave%2C+Nairobi';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Confirmation - Sandra & Samuel Wedding</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fdf8f9; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fdf8f9; padding: 20px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FCFAF7; border-radius: 20px; overflow: hidden; border: 1px solid #f3d4dc; box-shadow: 0 10px 30px rgba(114,47,55,0.08);">
          
          <!-- Top Hero Image Header -->
          <tr>
            <td align="center" style="position: relative; background-color: #722F37; padding: 0;">
              <div style="width: 100%; max-height: 280px; overflow: hidden; position: relative;">
                <img src="${couplePhotoUrl}" alt="Sandra & Samuel" style="width: 100%; height: auto; display: block; object-fit: cover; border-bottom: 3px solid #E892A2;" />
              </div>
            </td>
          </tr>

          <!-- Monogram Crest Header -->
          <tr>
            <td align="center" style="padding: 25px 20px 10px 20px; background-color: #FCFAF7;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 24px; border-radius: 25px; background-color: #722F37; border: 2px solid #E892A2; text-align: center; vertical-align: middle;">
                    <span style="font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #FFF0F3; letter-spacing: 2px;">S &amp; S</span>
                  </td>
                </tr>
              </table>
              <p style="margin: 10px 0 0 0; font-family: sans-serif; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; color: #722F37;">
                Official Wedding Pass
              </p>
            </td>
          </tr>

          <!-- Guest Greeting & Large Name -->
          <tr>
            <td align="center" style="padding: 10px 30px 20px 30px; text-align: center;">
              <p style="margin: 0; font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C86B85;">
                RSVP Confirmation
              </p>
              <h1 style="margin: 8px 0 0 0; font-family: Georgia, serif; font-size: 30px; font-weight: bold; color: #722F37; line-height: 1.2;">
                ${guest.fullName}
              </h1>
              <p style="margin: 10px 0 0 0; font-family: Georgia, serif; font-style: italic; font-size: 16px; color: #665c52;">
                ${guest.willAttend === 'yes' ? 'We are overjoyed to welcome you to celebrate with us!' : 'Thank you for letting us know. You will be in our thoughts!'}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(to right, transparent, #E892A2, transparent); width: 100%;"></div>
            </td>
          </tr>

          <!-- Date, Time and Venue Section -->
          <tr>
            <td style="padding: 25px 30px; background-color: #ffffff;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                
                <!-- Date -->
                <tr>
                  <td style="padding-bottom: 18px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top" style="padding-right: 12px;">
                          <span style="font-size: 18px;">📅</span>
                        </td>
                        <td>
                          <div style="font-family: sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #C86B85;">Wedding Date</div>
                          <div style="font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: #2A0E17; margin-top: 2px;">Saturday, October 17, 2026</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Ceremony Time & Venue -->
                <tr>
                  <td style="padding-bottom: 18px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top" style="padding-right: 12px;">
                          <span style="font-size: 18px;">⛪</span>
                        </td>
                        <td>
                          <div style="font-family: sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #722F37;">Church Service</div>
                          <div style="font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #2A0E17; margin-top: 2px;">All Saints Cathedral Church</div>
                          <div style="font-family: sans-serif; font-size: 12px; color: #554e46; margin-top: 2px;">9:00 AM to 11:00 AM</div>
                          <div style="font-family: sans-serif; font-size: 11px; color: #887d72;">Kenyatta Avenue, Nairobi, Kenya</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Reception Time & Venue -->
                <tr>
                  <td>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top" style="padding-right: 12px;">
                          <span style="font-size: 18px;">🥂</span>
                        </td>
                        <td>
                          <div style="font-family: sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #C86B85;">Reception Venue</div>
                          <div style="font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #2A0E17; margin-top: 2px;">Marist International University</div>
                          <div style="font-family: sans-serif; font-size: 12px; color: #554e46; margin-top: 2px;">12:00 Noon Arrival &amp; Celebrations</div>
                          <div style="font-family: sans-serif; font-size: 11px; color: #887d72;">Karen / Lang'ata, Nairobi, Kenya</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- QR Code Section -->
          <tr>
            <td align="center" style="padding: 25px 20px; background-color: #fdf5f7; border-top: 1px solid #f7e1e6; border-bottom: 1px solid #f7e1e6;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 15px; border-radius: 16px; border: 1px solid #f0d5dc;">
                <tr>
                  <td align="center">
                    <img src="${qrCodeUrl}" alt="Guest Check-in QR Code" width="160" height="160" style="display: block; border-radius: 8px;" />
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0 0; font-family: sans-serif; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #722F37;">
                Official Entry Pass &amp; Check-In QR Code
              </p>
              <p style="margin: 4px 0 0 0; font-family: monospace; font-size: 12px; color: #C86B85; font-weight: bold;">
                ID: ${guest.id.toUpperCase()}
              </p>
            </td>
          </tr>

          <!-- Action Buttons (Google Maps, Calendar, Minisite) -->
          <tr>
            <td align="center" style="padding: 30px 20px 25px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px;">
                
                <!-- Google Maps Button -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${googleMapsUrl}" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background-color: #722F37; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-align: center; border: 1px solid #5C242C;">
                      📍 Open in Google Maps
                    </a>
                  </td>
                </tr>

                <!-- Add to Calendar Button -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${googleCalendarUrl}" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background-color: #C86B85; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-align: center; border: 1px solid #B35872;">
                      📅 Add to Google Calendar
                    </a>
                  </td>
                </tr>

                <!-- Back to Minisite Button -->
                <tr>
                  <td align="center">
                    <a href="${baseUrl}" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background-color: #ffffff; color: #722F37; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-family: sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-align: center; border: 1.5px solid #722F37;">
                      ✨ Return to Wedding Minisite
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; background-color: #2A0E17; color: #f9e2e6; text-align: center;">
              <p style="margin: 0; font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #E892A2;">
                Sandra &amp; Samuel Wedding
              </p>
              <p style="margin: 5px 0 0 0; font-family: sans-serif; font-size: 11px; color: #e4abb8;">
                #SandraAndSamuel2026 • We look forward to celebrating with you!
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
