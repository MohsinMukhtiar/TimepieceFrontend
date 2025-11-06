import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer" style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Info */}
        <h3 style={styles.title}>
          © {new Date().getFullYear()} <strong>Hour Metric</strong>. Time is your greatest asset.
        </h3>
        <p style={styles.credit}>
          Website Designed &amp; Developed by{" "}
          <a
            href="https://www.mtechsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            M-TECH SOLUTIONS
          </a>
        </p>

        {/* Social Media Icons */}
        <div style={styles.socialContainer}>
          <a
            href="https://www.facebook.com/hourmetric"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ ...styles.iconLink, color: "#1877F2" }} // Facebook Blue
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/hourmetric"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ ...styles.iconLink, color: "#E4405F" }} // Instagram Pink
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.linkedin.com/company/hourmetric"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ ...styles.iconLink, color: "#0077B5" }} // LinkedIn Blue
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://www.youtube.com/@hourmetric"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            style={{ ...styles.iconLink, color: "#FF0000" }} // YouTube Red
          >
            <FaYoutube />
          </a>

          <a
            href="https://www.tiktok.com/@hourmetric"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            style={{ ...styles.iconLink, color: "#000000" }} // TikTok Black
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* 🎨 Updated Styles */
const styles = {
  footer: {
    backgroundColor: "#f9f9f9",
    color: "black",
    textAlign: "center",
    padding: "40px 20px",
    borderTop: "2px solid #ddd",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  credit: {
    fontSize: "0.9rem",
    marginBottom: "20px",
  },
  link: {
    color: "#e0b241",
    textDecoration: "none",
    fontWeight: "bold",
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  iconLink: {
    fontSize: "1.6rem",
    transition: "transform 0.3s ease, opacity 0.3s ease",
  },
};
