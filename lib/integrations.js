// Live social integrations (all optional — without keys the frontend
// falls back to Instagram embeds and curated testimonials).
// Responses are cached in module scope to stay far inside free API tiers.

const IG_GRAPH = 'https://graph.instagram.com/v21.0';
const PLACES_API = 'https://places.googleapis.com/v1/places';
const MEDIA_FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

const TTL = {
  feed: 30 * 60 * 1000,
  stories: 10 * 60 * 1000,
  reviews: 6 * 60 * 60 * 1000,
  error: 2 * 60 * 1000,
};

const cache = new Map();

async function cached(key, ttl, fetcher) {
  const entry = cache.get(key);
  const now = Date.now();
  if (entry && now - entry.at < (entry.value.error ? TTL.error : ttl)) {
    return entry.value;
  }
  const value = await fetcher();
  cache.set(key, { at: now, value });
  return value;
}

const formatMedia = (item) => ({
  id: item.id,
  caption: item.caption || '',
  media_type: item.media_type,
  media_url: item.media_url,
  thumbnail_url: item.thumbnail_url,
  permalink: item.permalink,
  timestamp: item.timestamp,
});

export async function getInstagramFeed(limit = 12) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return { configured: false, posts: [] };
  const user = process.env.INSTAGRAM_USER_ID || 'me';

  return cached(`ig_feed_${limit}`, TTL.feed, async () => {
    try {
      const res = await fetch(
        `${IG_GRAPH}/${user}/media?fields=${MEDIA_FIELDS}&limit=${Math.min(limit, 25)}&access_token=${token}`
      );
      if (!res.ok) throw new Error(`Instagram API ${res.status}`);
      const data = await res.json();
      return { configured: true, posts: (data.data || []).map(formatMedia) };
    } catch (e) {
      return { configured: true, posts: [], error: e.message };
    }
  });
}

export async function getInstagramStories() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return { configured: false, stories: [] };
  const user = process.env.INSTAGRAM_USER_ID || 'me';

  return cached('ig_stories', TTL.stories, async () => {
    try {
      const res = await fetch(`${IG_GRAPH}/${user}/stories?fields=${MEDIA_FIELDS}&access_token=${token}`);
      if (!res.ok) throw new Error(`Instagram API ${res.status}`);
      const data = await res.json();
      return { configured: true, stories: (data.data || []).map(formatMedia) };
    } catch (e) {
      return { configured: true, stories: [], error: e.message };
    }
  });
}

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return { configured: false, reviews: [] };

  return cached('google_reviews', TTL.reviews, async () => {
    try {
      const res = await fetch(`${PLACES_API}/${placeId}`, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
        },
      });
      if (!res.ok) throw new Error(`Places API ${res.status}`);
      const data = await res.json();
      return {
        configured: true,
        rating: data.rating,
        total_reviews: data.userRatingCount,
        maps_url: data.googleMapsUri,
        reviews: (data.reviews || []).map((r) => ({
          author: r.authorAttribution?.displayName || 'Google User',
          author_photo: r.authorAttribution?.photoUri,
          author_url: r.authorAttribution?.uri,
          rating: r.rating,
          relative_time: r.relativePublishTimeDescription,
          text: r.text?.text || '',
          publish_time: r.publishTime,
        })),
      };
    } catch (e) {
      return { configured: true, reviews: [], error: e.message };
    }
  });
}
