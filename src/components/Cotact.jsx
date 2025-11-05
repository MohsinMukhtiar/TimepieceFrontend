import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

     if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");  
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSend = () => {
    const { name, phone, message } = form;

     if (!name.trim() || !phone.trim()) {
      alert("Please enter both your Name and Phone number before sending.");
      return;
    }

    const text = `Hello!%0AName: ${name}%0APhone: ${phone}%0AMessage: ${
      message || "No message"
    }`;
    window.open(`https://wa.me/923012119368?text=${text}`, "_blank");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>
        We're here to help! Send us a message via{" "}
        <a href="https://wa.me/923012119368" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </p>

      <div className={styles.cardWrapper}>
        <div className={styles.formCard}>
          <h3>Send a Message</h3>

          <label>Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number"
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9]*"
            inputMode="numeric"
            required
          />

          <label>Message (Optional)</label>
          <textarea
            name="message"
            placeholder="How can we help you?"
            rows="4"
            value={form.message}
            onChange={handleChange}
          />

          <button className={styles.whBtn} onClick={handleSend}>
            💬 Send via WhatsApp
          </button>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoBox}>
            <h3>Get in Touch</h3>
            <p>💬 <strong>WhatsApp:</strong> +92 301 2119368</p>
            <p>📞 <strong>Phone:</strong> +92 301 2119368</p>
            <p>📧 <strong>Email:</strong> timepiece.pk.com@gmail.com</p>
          </div>

          <div className={styles.hoursBox}>
            <h4>Business Hours</h4>
            <p>
              We respond to WhatsApp messages throughout the day.
              <br />
              Send us a message anytime, and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <a
            href="https://wa.me/923012119368"
            target="_blank"
            rel="noreferrer"
            className={styles.directBtn}
          >
            💬 Chat Directly on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
