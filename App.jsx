import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./src/components/Navbar";
import Hero from "./src/components/Hero";
import Products from "./src/components/Products";
import Features from "./src/components/Features";
import CTA from "./src/components/CTA";
import Footer from "./src/components/Footer";

import About from "./src/components/About";
import Contact from "./src/components/Cotact";
import Admin from "./src/components/Admin";

import "../Frontend/src/Index.css";

export default function App() {
   function Home() {
    return (
      <>
        <Hero />
        <Features />
        <CTA />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
