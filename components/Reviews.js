import React from 'react';
import { BUSINESS } from '@/lib/businessRules';
import GoogleReviews from './GoogleReviews';

function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real reviews from our valued customers
          </p>
        </div>

        <div className="reviews-content">
          <div className="google-reviews-container">
            <GoogleReviews />

            <div className="google-maps-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8286419779897!2d73.04735137496908!3d21.598003580125658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0237ec798dc17%3A0xbe20ebcb0a43670a!2sThe%20Nail%20Hubs!5e0!3m2!1sen!2sin!4v1736709000000!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Nail Hubs Google Reviews"
              ></iframe>
            </div>

            <div className="review-cta">
              <h3>Love Our Service?</h3>
              <p>Share your experience with us on Google!</p>
              <a
                href={BUSINESS.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="review-btn"
              >
                ⭐ Leave a Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
