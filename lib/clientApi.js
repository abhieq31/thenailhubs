// Client-side fetch helpers. API routes live in the same Next.js app,
// so calls are same-origin — no CORS, no API URL config, ever.

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.detail || `Request failed (${response.status})`);
    error.status = response.status;
    error.detail = data.detail;
    throw error;
  }

  return data;
}

export const api = {
  getServices: () => request('/api/services'),
  getAvailableDates: (days = 7) => request(`/api/available-dates?days=${days}`),
  getAvailability: (service, date, count = 6) =>
    request('/api/availability', {
      method: 'POST',
      body: JSON.stringify({ service, date, count }),
    }),
  book: (booking) => request('/api/book', { method: 'POST', body: JSON.stringify(booking) }),
  reschedule: (confirmationId, newDate, newTime) =>
    request('/api/reschedule', {
      method: 'POST',
      body: JSON.stringify({ confirmation_id: confirmationId, new_date: newDate, new_time: newTime }),
    }),
  cancel: (confirmationId) =>
    request('/api/cancel', {
      method: 'POST',
      body: JSON.stringify({ confirmation_id: confirmationId }),
    }),
  getAppointment: (confirmationId) => request(`/api/appointment/${confirmationId}`),
  getInstagramFeed: (limit = 12) => request(`/api/instagram/feed?limit=${limit}`),
  getInstagramStories: () => request('/api/instagram/stories'),
  getGoogleReviews: () => request('/api/google/reviews'),
};
