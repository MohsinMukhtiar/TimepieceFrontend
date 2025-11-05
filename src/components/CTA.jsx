 import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Ready to Find Your Perfect Watch?</h2>
        <p>
          Browse our collection or reach out directly for personalized assistance.
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
