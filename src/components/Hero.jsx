import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/1000119615-min.png";
import img2 from "../assets/1000119619-min.png";

const WHATSAPP_NUMBER = "+923012119368";

export default function Hero() {
  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    "Hello! I want to enquire about watches"
  )}`;

  // --- Auto background change logic ---
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Inline styles for the hero background
  const heroStyle = {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${images[currentImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 1s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: "700px",
    padding: "1rem",
  };

  return (
    <div className="Hero-root">
      {/* HERO SECTION */}
      <section className="hero" style={heroStyle}>
        <div className="hero-overlay" style={overlayStyle} />
        <div className="hero-content" style={contentStyle}>
          <h1>Premium Watches</h1>
          <p className="subheading">Modern • Classic • Imported</p>
          <p className="description">
            Explore our curated collection for Men, Women & Children. Timeless elegance meets
            contemporary design.
          </p>
          <div className="hero-buttons" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link
              to="/products"
              className="btn btn-primary"
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "4px",
                backgroundColor: "#ffb400",
                color: "#000",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Shop Now
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: "4px",
                border: "2px solid #fff",
                color: "#464647ff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        className="features"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "3rem 1rem",
          background: "#f8f8f8",
          flexWrap: "wrap",
        }}
      >
        <div style={{ margin: "1rem 1.5rem", textAlign: "center", maxWidth: "250px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⌚</div>
          <h3>Premium Quality</h3>
          <p>Handpicked watches from trusted manufacturers worldwide</p>
        </div>

        <div style={{ margin: "1rem 1.5rem", textAlign: "center", maxWidth: "250px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🏆</div>
          <h3>Authentic Designs</h3>
          <p>Every Timepiece25.pk is verified for authenticity and craftsmanship</p>
        </div>

        <div style={{ margin: "1rem 1.5rem", textAlign: "center", maxWidth: "250px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🛡️</div>
          <h3>Trusted Service</h3>
          <p>Dedicated customer support via WhatsApp for your convenience</p>
        </div>
      </section>
    </div>
  );
}

