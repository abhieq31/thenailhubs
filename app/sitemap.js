const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thenailhubs.vercel.app';

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/try-on`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];
}
