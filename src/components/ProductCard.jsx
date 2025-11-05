import React from "react";
 
export default function ProductCard({ product, onOpenLightbox, onTagClick }) {
  const {
    _id,
    title = "Untitled",
    price = "",
    category = "Uncategorized",
    description = "",
    images = [],
  } = product;

  const thumb = images && images.length ? images[0] : null;
  const whatsappNumber = "+923012119368";  

  function handleImageClick(idx = 0) {
    if (onOpenLightbox) onOpenLightbox(images, idx);
  }

  function handleTagClick(e) {
    e.stopPropagation();
    if (onTagClick) onTagClick(category);
  }

  return (
    <article
      className="product-card"
      aria-labelledby={`prod-${_id}`}
      role="article"
      onKeyDown={(e) => {
        if (e.key === "Enter") handleImageClick(0);
      }}
    >
      <div
        className="product-image"
        role="button"
        tabIndex={0}
        onClick={() => handleImageClick(0)}
        aria-label={`Open images for ${title}`}
      >
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.png";
            }}
          />
        ) : (
          <div className="thumb-placeholder" aria-hidden="true">
            No image
          </div>
        )}
      </div>

      <div className="product-body">
  <div className="product-meta">
    <h3 id={`prod-${_id}`} className="product-title">
      {title}
    </h3>

    <button
      type="button"
      className="product-tag"
      onClick={handleTagClick}
      title={`Filter by ${category}`}
      aria-label={`Filter by ${category}`}
    >
      {category}
    </button>
  </div>

  {price && <div className="product-price">PKR {price}</div>}

  {description ? <p className="product-desc">{description}</p> : null}

  <div className="product-actions">
    <a
      className="whatsapp-btn"
      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hello, I'm interested in ${title}${price ? ` (Price: PKR ${price})` : ""}.`
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ask about ${title} on WhatsApp`}
    >
      💬 Ask on WhatsApp
    </a>

    <button
      className="btn-quick-view"
      onClick={() => handleImageClick(0)}
      aria-label={`Quick view ${title}`}
    >
      Quick view
    </button>
  </div>
</div>


       <style>{`
        :root {
          --card-bg: #fff;
          --muted: #64748b;
          --accent: #d6a11b;
          --border: #e6eef5;
          --shadow: 0 6px 18px rgba(9,30,66,0.06);
        }

        .product-card {
          display: flex;
          flex-direction: column;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 220ms ease, box-shadow 220ms ease;
          min-height: 100%;
        }

        .product-card:focus-within,
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(9,30,66,0.12);
        }

        /* Image area */
        .product-image {
          width: 100%;
          height: 0;
          padding-bottom: 75%; /* 4:3 aspect ratio */
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg,#f8fafc,#ffffff);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .product-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 300ms ease;
        }

        .product-image:hover img {
          transform: scale(1.03);
        }

        .thumb-placeholder {
          position: absolute;
          inset: 0;
          display:flex;
          align-items:center;
          justify-content:center;
          color: var(--muted);
          font-size: 14px;
          background: linear-gradient(180deg,#f1f5f9,#f8fafc);
        }

        /* Body */
        .product-body {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .product-title {
          margin: 0;
          font-size: 16px;
          line-height: 1.2;
          color: #0b2033;
          font-weight: 600;
          word-break: break-word;
        }

        .product-tag {
          background: #f3f7fb;
          border: none;
          padding: 6px 10px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 12px;
          color: #40546b;
          flex-shrink: 0;
        }

        .product-price {
          color: var(--accent);
          font-weight: 700;
          font-size: 15px;
          margin-top: -4px;
        }

        /*
         * Multi-line clamp for description:
         * - shows up to 3 lines (change --lines var)
         * - wraps and breaks long words if needed
         */
        .product-desc {
          margin: 0;
          color: #475569;
          font-size: 14px;
          line-height: 1.5;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* number of lines to show */
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          word-break: break-word;
          overflow-wrap: anywhere;
          min-height: 3.6em; /* roughly 3 lines to reduce layout shift */
        }

        /* Actions layout */
        .product-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: auto; /* push actions to bottom on tall cards */
        }

       
        .whatsapp-btn:active { transform: translateY(1px); }
        .whatsapp-btn:focus { outline: 3px solid rgba(37,211,102,0.18); }

        .btn-quick-view {
          background: transparent;
          border: 1px solid var(--border);
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          color: #0b2033;
          flex: 0 0 auto;
        }

        /* Desktop: place actions inline */
        @media (min-width: 900px) {
          .product-image {
            padding-bottom: 64%; /* slightly wider image on desktop */
          }
          .product-desc { min-height: 54px; }
        }

        /* Mobile-friendly adjustments */
        @media (max-width: 600px) {
          .product-card {
            border-radius: 10px;
          }
          .product-image { padding-bottom: 66%; }
          .product-title { font-size: 15px; }
          .product-desc { font-size: 13px; min-height: 48px; }
          .product-actions {
            flex-direction: column;
            gap: 8px;
            align-items: stretch;
          }
          .whatsapp-btn, .btn-quick-view {
            width: 100%;
            padding: 12px;
            border-radius: 10px;
            font-size: 15px;
          }
          .btn-quick-view {
            border: 1px solid rgba(11,32,51,0.06);
          }
        }

        /* Very small screens: simplify spacing */
        @media (max-width: 360px) {
          .product-body { padding: 10px; }
          .product-title { font-size: 14px; }
          .product-desc { font-size: 13px; }
        }
      `}</style>
    </article>
  );
}
