'use client';

import { useEffect } from 'react';

// Progressive-enhancement scroll animations: cards/sections gently rise
// into view as you scroll. Without JS nothing is ever hidden — the
// effect only activates once the 'js-reveal' class lands on <body>.
const TARGETS = [
  '.service-card',
  '.feature-card',
  '.review-card',
  '.contact-card',
  '.highlight-item',
  '.tryon-teaser-card',
  '.instagram-showcase',
  '.women-owned-badge',
  '.ig-post-card',
].join(', ');

export default function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    document.body.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll(TARGETS).forEach((el) => {
        if (!el.classList.contains('in-view')) observer.observe(el);
      });
    };

    observeAll();
    // catch late-mounted elements (Instagram feed, live reviews)
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.body.classList.remove('js-reveal');
    };
  }, []);

  return null;
}
