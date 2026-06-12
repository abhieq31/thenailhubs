import React from 'react';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About The Nail Hubs</h2>

            <div className="women-owned-badge">
              <span className="badge-icon">💜</span>
              <span className="badge-text">Proudly Women-Owned Business</span>
            </div>

            <p className="about-description">
              Welcome to The Nail Hubs, Ankleshwar&apos;s premier destination for luxury nail care.
              We specialize in creating stunning nail art and providing top-tier nail services
              in a relaxing, elegant environment.
            </p>
            <p className="about-description">
              Our team brings years of experience and a passion for perfection to every
              appointment. We use only premium quality products to ensure the health and
              beauty of your nails.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-number">5+</div>
                <div className="highlight-label">Years Experience</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">1000+</div>
                <div className="highlight-label">Happy Clients</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">7</div>
                <div className="highlight-label">Premium Services</div>
              </div>
            </div>

            <div className="why-choose">
              <h3>Why Choose Us?</h3>
              <ul className="why-list">
                <li><span className="check-icon">✓</span> Women-owned and operated</li>
                <li><span className="check-icon">✓</span> 5+ years of experience</li>
                <li><span className="check-icon">✓</span> Premium quality products</li>
                <li><span className="check-icon">✓</span> Hygienic and sanitized tools</li>
                <li><span className="check-icon">✓</span> Relaxing ambiance</li>
                <li><span className="check-icon">✓</span> Personalized service</li>
                <li><span className="check-icon">✓</span> AI virtual try-on — first in Gujarat</li>
              </ul>
            </div>
          </div>

          <div className="about-image">
            <iframe
              src="https://www.instagram.com/p/C_Nzu25CnYd/embed"
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              title="Instagram Reel"
              style={{
                background: 'white',
                borderRadius: '20px',
                border: '2px solid var(--primary-gold)',
                boxShadow: '0 10px 40px rgba(201, 169, 97, 0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
