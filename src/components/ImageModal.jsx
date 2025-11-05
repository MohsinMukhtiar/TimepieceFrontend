 import React, { useEffect, useRef, useState } from "react";

export default function ImageModal({ open, images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex || 0);
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const pointerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

   useEffect(() => {
    if (open) {
      setIndex(startIndex || 0);
      setZoom(1);
      setTranslate({ x: 0, y: 0 });
       document.body.style.overflow = "hidden";
       setTimeout(() => overlayRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, startIndex]);

   useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "+" || (e.ctrlKey && e.key === "=")) setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-" || (e.ctrlKey && e.key === "_")) setZoom((z) => Math.max(1, z - 0.25));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
   }, [open, index]);

   useEffect(() => {
    if (!open) return;
    function onTouchStart(e) {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
    function onTouchEnd(e) {
      if (touchStartX.current == null) return;
      const endX = (e.changedTouches && e.changedTouches[0].clientX) || null;
      const endY = (e.changedTouches && e.changedTouches[0].clientY) || null;
      if (endX == null || endY == null) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }
      const dx = endX - touchStartX.current;
      const dy = endY - touchStartY.current;
       if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next();
        else prev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    }
    const overlay = overlayRef.current;
    overlay?.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay?.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      overlay?.removeEventListener("touchstart", onTouchStart);
      overlay?.removeEventListener("touchend", onTouchEnd);
    };
  }, [open, index]);

   useEffect(() => {
    setTranslate({ x: 0, y: 0 });
  }, [index, zoom]);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
    setZoom(1);
  }

  function zoomIn() {
    setZoom((z) => Math.min(3, Number((z + 0.25).toFixed(2))));
  }
  function zoomOut() {
    setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))));
  }
  function resetZoom() {
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
  }

   function onPointerDown(e) {
    if (zoom <= 1) return;
    e.preventDefault();
    pointerRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }
  function onPointerMove(e) {
    if (!isDragging || !pointerRef.current) return;
    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  }
  function onPointerUp() {
    setIsDragging(false);
    pointerRef.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

   function onWheel(e) {
    if (!open) return;
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    if (e.ctrlKey || e.metaKey) return; 
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => {
      const nextZ = Math.min(3, Math.max(1, Number((z + delta).toFixed(2))));
      return nextZ;
    });
  }

  if (!open) return null;

  const src = images && images.length ? images[index] : null;

  return (
    <div
      className="imodal-overlay"
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={() => onClose?.()}
      onWheel={onWheel}
    >
      <div className="imodal-content" onClick={(e) => e.stopPropagation()}>
        <div className="imodal-top">
          <button className="imodal-close" onClick={() => onClose?.()} aria-label="Close">✕</button>

          <div className="imodal-controls">
            <button className="ctrl" onClick={prev} aria-label="Previous" disabled={images.length <= 1}>‹</button>
            <div className="zoom-group" aria-hidden>
              <button className="ctrl" onClick={zoomOut} aria-label="Zoom out">➖</button>
              <div className="zoom-level">{Math.round(zoom * 100)}%</div>
              <button className="ctrl" onClick={zoomIn} aria-label="Zoom in">➕</button>
              <button className="ctrl" onClick={resetZoom} aria-label="Reset zoom">⤾</button>
            </div>
            <button className="ctrl" onClick={next} aria-label="Next" disabled={images.length <= 1}>›</button>
          </div>
        </div>

        <div
          className="imodal-stage"
          onPointerDown={onPointerDown}
          role="presentation"
        >
          {src ? (
            <img
              ref={imgRef}
              src={src}
              alt={`Image ${index + 1}`}
              className="imodal-img"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
                cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
              }}
              draggable={false}
            />
          ) : (
            <div className="imodal-empty">No images</div>
          )}
        </div>

        {images.length > 1 && (
          <div className="imodal-thumbs" role="toolbar" aria-label="Thumbnails">
            {images.map((u, i) => (
              <button
                key={i}
                className={`thumb ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
              >
                <img src={u} alt={`thumb-${i}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .imodal-overlay {
          position: fixed;
          inset: 0;
          z-index: 4000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.85));
          padding: 18px;
        }

        .imodal-content {
          width: 100%;
          max-width: 1200px;
          max-height: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          outline: none;
        }

        .imodal-top {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 12px;
        }

        .imodal-close {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 22px;
          padding: 8px;
          cursor: pointer;
        }

        .imodal-controls {
          margin-left: auto;
          display:flex;
          gap: 8px;
          align-items:center;
        }

        .ctrl {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          padding: 8px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }
        .ctrl:disabled { opacity: 0.35; cursor: not-allowed; }

        .zoom-group { display:flex; align-items:center; gap:8px; color:#fff; font-weight:600; }
        .zoom-level { min-width:48px; text-align:center; font-size:14px; }

        .imodal-stage {
          width: 100%;
          height: calc(100vh - 220px);
          max-height: 78vh;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow: hidden;
          border-radius: 12px;
          background: rgba(0,0,0,0.2);
        }

        .imodal-img {
          max-width: 100%;
          max-height: 100%;
          transition: transform 120ms ease;
          user-select: none;
          -webkit-user-drag: none;
          will-change: transform;
          box-shadow: 0 12px 30px rgba(2,6,23,0.6);
        }

        .imodal-empty {
          color: #fff;
          padding: 24px;
        }

        .imodal-thumbs {
          display:flex;
          gap:10px;
          overflow-x:auto;
          padding: 8px 2px;
          justify-content:center;
        }

        .thumb {
          background: transparent;
          border: 2px solid transparent;
          padding: 2px;
          border-radius: 6px;
          cursor: pointer;
        }
        .thumb.active { border-color: rgba(255,255,255,0.18); }
        .thumb img { width:72px; height:44px; object-fit:cover; display:block; border-radius:4px; }

        /* Responsive adjustments */
        @media (max-width: 900px) {
          .imodal-stage { height: calc(100vh - 200px); max-height: 70vh; }
          .thumb img { width:60px; height:40px; }
        }
        @media (max-width: 600px) {
          .imodal-content { padding: 8px; }
          .imodal-stage { height: calc(100vh - 180px); max-height: 66vh; border-radius: 8px; }
          .thumb img { width:48px; height:32px; }
          .ctrl { padding: 6px 8px; font-size: 14px; }
        }
      `}</style>
    </div>
  );
}
