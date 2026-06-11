// Business configuration for The Nail Hubs
// All booking rules live here — change once, applies everywhere.

export const BUSINESS = {
  name: 'The Nail Hubs',
  type: 'Luxury Nail Salon',
  location: 'Ankleshwar, Gujarat, India',
  address: 'B-292, Garden City, Ankleshwar – 393001',
  phone: '07698 235501',
  phoneIntl: '917698235501',
  instagram: 'thenailhubs',
  instagramUrl: 'https://www.instagram.com/thenailhubs/',
  whatsappChannel: 'https://www.whatsapp.com/channel/0029Vb6wVqy7T8bahzFZwV1d',
  mapsUrl:
    'https://www.google.com/maps?q=The+Nail+Hubs,+b-292+gardencity+,gidc+ankleshwer+pin:-393001,+Ankleshwar,+Gujarat+393001&ftid=0x3be0237ec798dc17:0xbe20ebcb0a43670a',
  reviewsUrl:
    'https://www.google.com/maps/place/The+Nail+Hubs/@21.5980035,73.0473514,17z/data=!4m8!3m7!1s0x3be0237ec798dc17:0xbe20ebcb0a43670a!8m2!3d21.5980035!4d73.0473514!9m1!1b1!16s%2Fg%2F11v9_ppp79?entry=ttu',
  owner: 'Saloni',
  timezone: 'Asia/Kolkata',
};

export const HOURS = {
  workingDays: [0, 1, 2, 3, 4, 5, 6], // 0=Sunday … 6=Saturday (JS getDay), open all week
  openingTime: '11:00', // 24h HH:MM
  closingTime: '18:00',
  bufferMinutes: 10, // gap between appointments
  advanceBookingDays: 30,
  minLeadMinutes: 30, // earliest a same-day slot can start from "now"
};

// name -> { duration: booking block in minutes (upper end of the real range
// so the schedule never overruns), displayDuration, icon, popular }
export const SERVICES = {
  'Acrylic Nails': { duration: 120, displayDuration: '100–120 min', icon: '💅', popular: true },
  'Nail Art': { duration: 90, displayDuration: '75–120 min', icon: '🎨', popular: false },
  'Nail Extensions': { duration: 110, displayDuration: '90–110 min', icon: '💎', popular: false },
  'Nail Decals': { duration: 35, displayDuration: '25–35 min', icon: '✨', popular: false },
  'Nail Polish Changes': { duration: 30, displayDuration: '25–30 min', icon: '💅', popular: false },
  'Nail Painting & Designs': { duration: 90, displayDuration: '60–90 min', icon: '🖌️', popular: false },
  'Nail Repair': { duration: 30, displayDuration: '20–30 min', icon: '🔧', popular: false },
};

export const SLOTS_TO_SUGGEST = 6;
