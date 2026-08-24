import { ProgramItem, ColorSwatch, GalleryPhoto } from './types';

export const WEDDING_DATE = new Date('2026-10-17T09:00:00+03:00'); // East Africa Time: 17th October 2026

export const WEDDING_DETAILS = {
  couple: {
    bride: 'Sandra',
    groom: 'Sam',
    brideFull: 'Sandra Chepchumba Kiptoo',
    groomFull: 'Samuel Ochieng Okello',
    nickname: 'Sandra&Sam2026',
    hashtag: '#Sandra&Sam2026',
    featureHeadline: 'Our Love Story & Celebration of Holy Matrimony',
    loveStory: 'Some of life’s most beautiful moments are the ones we never planned. What began as a journey of two people has grown into a love filled with friendship, laughter, memories and countless reasons to be grateful. Through every season, we have found our way to each other, and now we are excited to take the next step together. From this day forward, we choose each other — every day, for the rest of our lives. And we would love for you to be there as we say: “I do.” 💍',
  },
  families: {
    brideFamily: "Mr. Charles Kiptoo & Mrs. Nancy Kiptoo",
    groomFamily: "Mr. James Okello & Mrs. Angeline Okello",
    invitationMessage: "With grateful hearts and the blessings of our families, Mr. Charles Kiptoo & Mrs. Nancy Kiptoo together with Mr. James Okello & Mrs. Angeline Okello joyfully invite you to celebrate the wedding of their children, Sandra Chepchumba Kiptoo & Samuel Ochieng Okello."
  },
  ceremony: {
    time: '9:00 AM (9:00 AM - 11:00 AM)',
    venue: 'All Saints Cathedral Church',
    address: 'Kenyatta Avenue, Nairobi, Kenya',
    coordinates: { lat: -1.2884, lng: 36.8170 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=All+Saints+Cathedral,+Kenyatta+Avenue,+Nairobi&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '12:00 Noon onwards',
    venue: 'Marist International University',
    address: 'Marist International University College, Langata / Karen, Nairobi, Kenya',
    coordinates: { lat: -1.3503, lng: 36.7588 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Marist+International+University+College,+Nairobi&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  contacts: [
    { name: 'Sandra & Sam RSVP', phone: '0711910037' },
    { name: 'RSVP Support', phone: '0726580861' },
  ],
  registry: {
    message: 'Having you share in our special day is a gift in itself. Should you wish to bless us further, we gratefully welcome gifts in the form of an envelope or M-Pesa.',
    tillNumber: '3480983',
    accountName: 'Sandra & Sam Wedding',
    envelopeNote: 'Gift envelopes can be presented at the wedding reception during the gift session.'
  },
  dressCode: {
    formalTheme: 'Formal Elegance',
    ladies: 'Elegant Dresses and gowns',
    gentlemen: 'Suits or formal traditional wear',
    guideline: 'Formal Elegance',
    kidsNote: 'With love for all our little ones, we invite you to join us for a day of celebration in formal elegance.'
  },
  bibleVerses: [
    {
      text: 'When the time is right, I, the Lord, will make it happen.',
      reference: 'Isaiah 60:22',
    },
    {
      text: 'What therefore God hath joined together, let not man put asunder.',
      reference: 'Mark 10:9',
    },
    {
      text: 'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.',
      reference: 'Ecclesiastes 4:9-10',
    },
    {
      text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.',
      reference: '1 Corinthians 13:4,7',
    }
  ]
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '9:00 AM - 11:00 AM',
    duration: '2 hours',
    title: 'Church Service',
    description: 'Sacrament of Holy Matrimony & Nuptial Worship Service at All Saints Cathedral Church',
    isChurch: true,
  },
  {
    time: '12:00 Noon',
    duration: '30 mins',
    title: 'Arrival at Marist',
    description: 'Welcome and reception arrival at Marist International University',
    isChurch: false,
  },
  {
    time: '12:30 PM',
    duration: '30 mins',
    title: 'Mocktails & Refreshments',
    description: 'Guests mingle and enjoy refreshing welcome mocktails',
    isChurch: false,
  },
  {
    time: '1:00 PM - 2:00 PM',
    duration: '1 hour',
    title: 'Lunch Banquet',
    description: 'Celebratory wedding feast and dining',
    isChurch: false,
  },
  {
    time: '2:00 PM - 3:00 PM',
    duration: '1 hour',
    title: 'Entertainment & Performances',
    description: 'Joyful music, dance, and cultural presentations',
    isChurch: false,
  },
  {
    time: '3:00 PM - 4:00 PM',
    duration: '1 hour',
    title: 'Speeches & Gifts',
    description: 'Heartfelt speeches from families & presentation of wedding gifts / envelopes',
    isChurch: false,
  },
  {
    time: '4:00 PM - 5:00 PM',
    duration: '1 hour',
    title: 'Cake Cutting Celebration',
    description: 'Ceremonial cutting of the wedding cake and champagne toast',
    isChurch: false,
  },
  {
    time: '5:00 PM - 6:00 PM',
    duration: '1 hour',
    title: 'Vote of Thanks',
    description: 'Expressions of gratitude from the bride and groom',
    isChurch: false,
  },
  {
    time: '6:00 PM',
    duration: 'Evening',
    title: 'Closing Prayer & Departure',
    description: 'Benediction, final blessings, and celebratory send-off',
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Soft Rose & Blush Pink',
    hex: '#E892A2',
    textColor: '#FFFFFF',
    description: 'Delicate and romantic pink tones symbolizing sweet love and gentle elegance.'
  },
  {
    name: 'Dusty Rose Pink',
    hex: '#C86B85',
    textColor: '#FFFFFF',
    description: 'A warm, sophisticated pink hue that embodies grace, beauty, and tenderness.'
  },
  {
    name: 'Hints of Burgundy',
    hex: '#722F37',
    textColor: '#FFFFFF',
    description: 'A deep, royal wine burgundy accent adding regal depth, strength, and classic richness.'
  },
  {
    name: 'Champagne & Rose Gold',
    hex: '#E6C280',
    textColor: '#2D1B22',
    description: 'A sparkling, luminous warm accent that complements the pink and burgundy palette.'
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: '/src/assets/images/carol_and_john_portrait_1784461506194.jpg',
    caption: 'Sandra & Samuel - Celebrating Our Love',
    uploaderName: 'Sandra & Samuel',
    deviceInfo: 'iPhone 15 Pro',
    likes: 38,
    uploadedAt: 'Recent'
  },
  {
    id: 'photo-2',
    url: '/src/assets/images/church_venue_1784464948619.jpg',
    caption: 'All Saints Cathedral Church - The Sanctuary',
    uploaderName: 'Church Committee',
    deviceInfo: 'iPhone 15 Pro Max',
    likes: 29,
    uploadedAt: 'Recent'
  },
  {
    id: 'photo-3',
    url: '/src/assets/images/reception_venue_1784464963155.jpg',
    caption: 'Marist International University Grounds',
    uploaderName: 'Event Decor Team',
    deviceInfo: 'iPhone 14 Pro',
    likes: 34,
    uploadedAt: 'Recent'
  },
  {
    id: 'photo-4',
    url: '/src/assets/images/reception_venue_1784475057575.jpg',
    caption: 'Celebration Garden & Reception Setting',
    uploaderName: 'Bridal Party',
    deviceInfo: 'iPhone 15 Pro Max',
    likes: 42,
    uploadedAt: 'Recent'
  }
];

