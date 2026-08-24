import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { generateRsvpEmailHtml } from '../src/lib/emailTemplate';

export async function sendRsvpEmailHandler(req: Request, res: Response) {
  try {
    const { guest, emailAddress } = req.body;

    if (!guest || !guest.fullName) {
      return res.status(400).json({ error: 'Missing guest details in request.' });
    }

    const recipient = emailAddress || guest.email;
    const PORT = 3000;
    const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;

    // Generate HTML email content with Cloudinary uploaded image assets
    const htmlContent = await generateRsvpEmailHtml(guest, baseUrl);

    let emailSent = false;
    let emailError: string | null = null;
    let serviceUsed = 'none';

    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // 1. Try sending via Resend first if RESEND_API_KEY is configured
    if (recipient && resendApiKey) {
      try {
        serviceUsed = 'Resend';
        const resend = new Resend(resendApiKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Sandra & Samuel Wedding <onboarding@resend.dev>';
        
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: [recipient],
          subject: `✨ Official RSVP Confirmation & Wedding Pass for ${guest.fullName}`,
          html: htmlContent,
        });

        if (error) {
          console.error('Resend delivery error:', error);
          emailError = typeof error === 'object' ? (error as any).message || JSON.stringify(error) : String(error);
        } else {
          emailSent = true;
        }
      } catch (err: any) {
        console.error('Failed to send email via Resend:', err);
        emailError = err?.message || 'Resend service failed';
      }
    }

    // 2. Fallback to SMTP nodemailer if Resend not sent and SMTP details provided
    if (!emailSent && recipient && smtpHost && smtpUser && smtpPass) {
      try {
        serviceUsed = 'SMTP';
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Sandra & Samuel Wedding" <${smtpUser}>`,
          to: recipient,
          subject: `✨ Official RSVP Confirmation & Wedding Pass for ${guest.fullName}`,
          html: htmlContent,
        });

        emailSent = true;
        emailError = null;
      } catch (err: any) {
        console.error('Failed to send email via SMTP transporter:', err);
        emailError = err?.message || 'SMTP delivery failed';
      }
    }

    let message = `RSVP Pass generated successfully!`;
    if (emailSent) {
      message = `Official RSVP Confirmation Email delivered to ${recipient} via ${serviceUsed}!`;
    } else if (recipient && !resendApiKey && !smtpHost) {
      message = `RSVP Pass recorded for ${recipient}! Set RESEND_API_KEY in environment variables to enable live Resend email delivery.`;
    }

    return res.json({
      success: true,
      emailSent,
      serviceUsed,
      emailError,
      recipient: recipient || null,
      message,
      previewHtml: htmlContent,
    });
  } catch (error: any) {
    console.error('Error handling send-rsvp-email endpoint:', error);
    return res.status(500).json({ error: 'Internal server error processing RSVP email.' });
  }
}
