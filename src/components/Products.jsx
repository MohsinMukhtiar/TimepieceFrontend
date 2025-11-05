import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ImageModal from "./ImageModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxStart, setLightboxStart] = useState(0);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const API_URL = "https://timepiece-production.up.railway.app/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const tags = new Set(products.map((p) => p.category || p.tag).filter(Boolean));
    return ["All", ...Array.from(tags)];
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debouncedQuery;
    return products.filter((p) => {
      const tag = p.category || p.tag || "";
      if (category !== "All" && tag !== category) return false;
      if (!q) return true;
      return (
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (tag && tag.toLowerCase().includes(q))
      );
    });
  }, [category, debouncedQuery, products]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filtered.slice(startIndex, startIndex + productsPerPage);
  }, [filtered, currentPage]);

  const openLightbox = useCallback((images, startIndex = 0) => {
    setLightboxImages(images || []);
    setLightboxStart(startIndex);
    setLightboxOpen(true);
  }, []);

  const onTagFilter = useCallback((tag) => {
    setCategory(tag);
    setQuery("");
    setDebouncedQuery("");
    setCurrentPage(1); // Reset to page 1 when a filter is applied
  }, []);

  const clearFilters = () => {
    setCategory("All");
    setQuery("");
    setDebouncedQuery("");
    setCurrentPage(1); // Reset to page 1 when clearing filters
  };

  const handlePagination = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && prevPage < totalPages) return prevPage + 1;
      if (direction === "prev" && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Our Collection</h1>
        <p className="muted">Discover premium watches for every style and occasion</p>

        <div className="filters" role="region" aria-label="Product filters">
          <div className="category-buttons" role="tablist" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c}
                className={`cat-btn ${c === category ? "active" : ""}`}
                onClick={() => setCategory(c)}
                aria-pressed={c === category}
              >
                {c}
                {c !== "All" && (
                  <span className="cat-count">
                    {products.filter((p) => (p.category || p.tag) === c).length}
                  </span>
                )}
              </button>
            ))}
            <button className="cat-btn clear-btn" onClick={clearFilters}>
              Reset
            </button>
          </div>

          <div className="search-box" role="search">
            <input
              placeholder="Search watches..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search watches"
            />
            {query && (
              <button
                className="search-clear"
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="result-line">
          <div className="result-count">
            Showing <strong>{currentProducts.length}</strong> result
            {currentProducts.length !== 1 ? "s" : ""}{" "}
            {category !== "All" && `for "${category}"`}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="product-grid" aria-live="polite">
          {currentProducts.length > 0 ? (
            currentProducts.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onOpenLightbox={openLightbox}
                onTagClick={onTagFilter}
              />
            ))
          ) : (
            <div className="no-results">
              No products found. Try another search or select a different category.
            </div>
          )}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
          className="page-btn"
        >
          Previous
        </button>
        <div className="page-numbers">
          {/* Generate page numbers */}
          {currentPage > 2 && (
            <>
              <button className="page-btn" onClick={() => setCurrentPage(1)}>
                1
              </button>
              <span className="ellipsis">...</span>
            </>
          )}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            if (page === currentPage || page === currentPage - 1 || page === currentPage + 1) {
              return (
                <button
                  key={page}
                  className={`page-btn ${page === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          {currentPage < totalPages - 1 && (
            <span className="ellipsis">...</span>
          )}
          {currentPage < totalPages - 1 && (
            <button className="page-btn" onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>
          )}
        </div>
        <button
          onClick={() => handlePagination("next")}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          Next
        </button>
      </div>

      <ImageModal
        open={lightboxOpen}
        images={lightboxImages}
        startIndex={lightboxStart}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
