import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section
      style={{
         color: "#fff",
        textAlign: "center",
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#fff",
          }}
        >
          Ready to Find Your Perfect Watch?
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
            color: "#dcdcdc",
          }}
        >
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
          aria-label="Shop our products"
          style={{
            backgroundColor: "#c9a227",
            border: "none",
            padding: "0.75rem 2rem",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "50px",
            textDecoration: "none",
            display: "inline-block",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e6be46";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#c9a227";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}

