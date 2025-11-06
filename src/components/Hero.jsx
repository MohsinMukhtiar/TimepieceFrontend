import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import img1 from "../assets/coverimage.png";
import img2 from "../assets/logo (2).png";


const WHATSAPP_NUMBER = "+923012119368";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const images = [img1, img2];

  // Auto image switch every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    "Hello! I want to enquire about Hour Metric watches."
  )}`;

  return (
    <div className="Hero-root">
      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Hour Metric</h1>
          <p>⌚️ Where Time Meets Style 💎 Luxury Reimagined — Watches & Clothing ✉️ DM to Enquire | 🌍 Worldwide Shipping Soon...</p>
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

          {/* NEW CLOTHING COLLECTION BUTTON */}
          <div className="explore-section">
            <button className="btn btn-explore" onClick={() => setShowModal(true)}>
              EXPLORE Hour Metric’s CLOTHING COLLECTION...
            </button>
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2 className="coming-soon-text">COMING SOON</h2>
            <p className="modal-subtext">Our exclusive clothing line launches soon. Stay tuned!</p>
          </div>
        </div>
      )}
    </div>
  );
}


