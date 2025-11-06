import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Ready to Find Your Perfect Watch?</h2>

        <p className="cta-text">
          Discover timepieces that go beyond trends — crafted for those who value
          precision, elegance, and individuality.
          <br /> <br />
          ⌚️ <strong>Where Time Meets Style</strong>
          <br />
          💎 <strong>Luxury Reimagined — Watches & Clothing</strong>
          <br />
          ✉️ <em>DM to Enquire</em> | 🌍 <em>Worldwide Shipping Soon...</em>
        </p>

        <Link
          to="/products"
          className="btn btn-primary"
          aria-label="Shop our products"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
