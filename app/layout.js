import { Analytics } from '@vercel/analytics/react';
import ChatProvider from '@/components/ChatProvider';
import '@/styles/globals.css';
import '@/styles/chat.css';
import '@/styles/feeds.css';
import '@/styles/tryon.css';

export const metadata = {
  title: 'The Nail Hubs - A Touch Of Elegance',
  description:
    "The Nail Hubs - Ankleshwar's Premier Luxury Nail Salon. Book your appointment 24/7, try nails on with AI, and explore acrylics, extensions, nail art and bridal designs.",
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'The Nail Hubs - A Touch Of Elegance',
    description:
      "Ankleshwar's premier luxury nail salon. Book instantly 24/7 with our AI receptionist, or try your dream nails on with the AI studio.",
    images: ['/logo.jpg'],
  },
};

export const viewport = {
  themeColor: '#C9A961',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <ChatProvider>{children}</ChatProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
