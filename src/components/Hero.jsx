import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css"; // make sure this file includes the hero background
import img1 from "../assets/logo (2).png"; // image still imported for build bundling

const WHATSAPP_NUMBER = "+923012119368";

export default function Hero() {
  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    "Hello! I want to enquire about Hour Metric watches."
  )}`;

  return (
    <div className="Hero-root">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Hour Metric</h1>
          <p className="subheading">Time is your greatest asset.</p>
          <p className="description">
            Discover premium watches that define precision, craftsmanship, and style.
            Explore our curated collection for Men, Women & Children — where timeless
            elegance meets modern design.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">⌚</div>
          <h3>Premium Quality</h3>
          <p>Handpicked watches from trusted manufacturers worldwide.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🏆</div>
          <h3>Authentic Designs</h3>
          <p>Every Hour Metric watch is verified for authenticity and craftsmanship.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h3>Trusted Service</h3>
          <p>Dedicated customer support via WhatsApp for your convenience.</p>
        </div>
      </section>
    </div>
  );
}
