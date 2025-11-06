import React from "react";
import {
  FaFacebookF,
  FaInstagram,
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
            href="https://www.facebook.com/share/1BebVVbfNX/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ ...styles.iconLink, color: "#1877F2" }} // Facebook Blue
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/hourmetric.store.co/?igsh=aDRpd3hsM214OG05"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ ...styles.iconLink, color: "#E4405F" }} // Instagram Pink
          >
            <FaInstagram />
          </a>

           
  
 
          <a
            href="https://www.tiktok.com/@hourmetric.store.co?_r=1&_t=ZS-91BOSMU0ZDs"
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

 const styles = {
  footer: {
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



