import React from 'react';
import { BUSINESS } from '@/lib/businessRules';
import InstagramFeed from './InstagramFeed';

function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">
            A glimpse of our artistry and attention to detail
          </p>
        </div>

        <div className="instagram-showcase">
          <div className="instagram-header">
            <div className="instagram-profile">
              <div className="instagram-avatar">
                <img src="/logo.svg" alt="The Nail Hubs" className="avatar-logo" />
              </div>
              <div className="instagram-info">
                <h3 className="instagram-username">@{BUSINESS.instagram}</h3>
                <p className="instagram-tagline">Ankleshwar&apos;s Premier Luxury Nail Salon</p>
              </div>
            </div>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="follow-btn"
            >
              <span className="follow-icon">📸</span>
              Follow on Instagram
            </a>
          </div>

          <div className="instagram-embed-container">
            <div className="embed-notice">
              <p className="embed-text">
                <span className="sparkle-icon">✨</span>
                Latest posts from @{BUSINESS.instagram}
                <span className="sparkle-icon">✨</span>
              </p>
            </div>

            <InstagramFeed />

            <div className="instagram-features">
              <div className="feature-card">
                <div className="feature-icon-box">💎</div>
                <h4>Premium Designs</h4>
                <p>Custom nail art & extensions</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-box">🎨</div>
                <h4>Daily Inspiration</h4>
                <p>New posts & client features</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-box">👑</div>
                <h4>Exclusive Offers</h4>
                <p>Instagram-only promotions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
