import React from 'react';
import Link from 'next/link';

// Home-page banner for the AI Virtual Try-On Studio
function TryOnTeaser() {
  return (
    <section className="tryon-teaser">
      <div className="container">
        <div className="tryon-teaser-card">
          <div className="tryon-teaser-text">
            <span className="tryon-teaser-badge">🤖 AI-Powered · First in Gujarat</span>
            <h2>Try Your Nails On — Before You Book</h2>
            <p>
              Point your camera at your hand and watch colours, shapes and finishes
              appear on your real fingertips — live, in your browser. Powered by
              on-device AI hand tracking. No app, no sign-up, and your camera
              never leaves your phone.
            </p>
            <Link href="/try-on" className="btn-primary tryon-teaser-btn">
              ✨ Open the Try-On Studio
            </Link>
          </div>
          <div className="tryon-teaser-visual" aria-hidden="true">
            <div className="tryon-hand">🖐️</div>
            <div className="tryon-sparkles">
              <span>💅</span><span>✨</span><span>💎</span><span>🎨</span><span>💖</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TryOnTeaser;
