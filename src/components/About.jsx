import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-root">
      <div className="about-container">
        <h1 className="about-title">About Hour Metric</h1>
        <p className="about-slogan">"Time is your greatest asset."</p>

        <div className="about-content">
          <p>
            Welcome to <strong>Hour Metric</strong>, your destination for premium timepieces that blend
            precision, craftsmanship, and style. We are dedicated to bringing you the finest watches
            from around the world, carefully curated to suit every style and occasion.
          </p>

          <p>
            Our collection spans modern designs, classic elegance, and imported luxury pieces.
            Whether you're looking for a sophisticated watch for business, a sporty timepiece
            for everyday wear, or an elegant accessory for special occasions — <strong>Hour Metric</strong> 
            has something for everyone.
          </p>

          <h2 className="about-subtitle">Our Promise</h2>
          <ul className="about-list">
            <li>Premium quality watches from trusted manufacturers</li>
            <li>Authentic products with verified craftsmanship</li>
            <li>Personalized customer service via WhatsApp</li>
            <li>Collections for Men, Women, and Children</li>
            <li>Competitive pricing on all our products</li>
          </ul>

          <h2 className="about-subtitle">Why Choose Hour Metric</h2>
          <p>
            At <strong>Hour Metric</strong>, we source our watches directly from reliable suppliers,
            ensuring authenticity and top-tier quality. Our team is passionate about timepieces
            and committed to helping you find the perfect watch that matches your personality and lifestyle.
          </p>

          <p>
            Have questions? We're always here to help. Reach out to us via WhatsApp for personalized
            assistance in finding your ideal timepiece.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
