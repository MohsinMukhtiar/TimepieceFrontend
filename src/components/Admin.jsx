import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin.css";

const API_URL = "https://timepiece-production.up.railway.app/api/products";
const LOGIN_URL = "https://timepiece-production.up.railway.app/api/admin/login";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // ✅ Persist login session
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchProducts(savedToken);
    }
  }, []);

  const fetchProducts = async (tk = token) => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${tk}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, { password });
      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);
        setToken(res.data.token);
        setIsLoggedIn(true);
        setError("");
        fetchProducts(res.data.token);
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    setToken("");
    localStorage.removeItem("adminToken");
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-root">
        <div className="admin-card login-card">
          <h2>Admin Login</h2>
          <p className="muted">Enter admin password to manage collection</p>
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </label>
            {error && <div className="error">{error}</div>}
            <button className="btn primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root">
      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p className="muted">Manage your watch collection</p>
        </div>
        <div className="header-actions">
          <button
            className="btn outline"
            onClick={() => setShowPreview((prev) => !prev)}
          >
            {showPreview ? "➕ Add New Product" : "👁 View Existing Products"}
          </button>
          <button className="btn danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {showPreview ? (
      <ProductList
      products={products}
      token={token}
      onDelete={async (id) => {
        if (window.confirm("Delete this product?")) {
          try {
            await axios.delete(`${API_URL}/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchProducts(token);
          } catch (err) {
            console.error(err);
            alert("Error deleting product");
          }
        }
      }}
      onUpdated={() => fetchProducts(token)}
    />
    
        ) : (
          <UploadForm token={token} onAdded={fetchProducts} />
        )}
      </div>
    </div>
  );
}

/* ---------------- UploadForm ------------------ */
function UploadForm({ token, onAdded }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "Men",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // Handle image selection
  function onSelectImages(e) {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  // Remove selected image
  function removeImage(idx) {
    URL.revokeObjectURL(previews[idx]);
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
    };
  }, [previews]);

  // Submit new product
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return alert("Please enter a title");
    if (form.description.length > 50)
      return alert("Description must be under 50 characters.");

    setBusy(true);
    setMsg("");

    try {
      const fd = new FormData();
      for (const [key, value] of Object.entries(form)) fd.append(key, value ?? "");
      imageFiles.forEach((file) => fd.append("images", file));

      await axios.post(API_URL, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("✅ Product added!");
      setForm({ title: "", price: "", description: "", category: "Men" });
      previews.forEach((url) => URL.revokeObjectURL(url));
      setImageFiles([]);
      setPreviews([]);
      onAdded(token);

      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      console.error("Upload error:", err);
      const errorMsg = err?.response?.data?.message || "❌ Error adding product";
      setMsg(errorMsg);
    } finally {
      setBusy(false);
    }
  }

 return (
  <div className="admin-card">
    <h3>Add New Product</h3>
    <form className="upload-form" onSubmit={handleSubmit}>
      {/* Title field: dropdown + custom input via datalist */}
      <label>
        Title *
        <input
          list="watchBrands"
          value={form.title} // ✅ FIXED: was editForm.title
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} // ✅ FIXED
          placeholder="Select or type a brand name"
          required
        />
        <datalist id="watchBrands">
          {[
            // 🇵🇰 Local & popular brands
            "Rado",
            "Citizen",
            "Casio",
            "Seiko",
            "Tissot",
            "Titan",
            "Q&Q",
            "Skmei",
            "Curren",
            "Naviforce",
            "Al-Fajr (Islamic Watch)",
            "Swiss Military",
            "Westar",
            "Pierre Cardin",
            "Quartz",
            // 🌍 International luxury brands
            "Rolex",
            "Omega",
            "Tag Heuer",
            "Fossil",
            "Audemars Piguet",
            "Patek Philippe",
            "Hublot",
            "Michael Kors",
            "Diesel",
            "Emporio Armani",
            "Longines",
            "Daniel Wellington",
            "Tommy Hilfiger",
            "Citizen Eco-Drive",
          ].map((brand) => (
            <option key={brand} value={brand} />
          ))}
        </datalist>
      </label>

      <label>
        Price
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="e.g., 5000"
          min="0"
          step="any"
        />
      </label>

      <label>
        Category *
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Men</option>
          <option>Women</option>
          <option>Children</option>
          <option>Imported</option>
        </select>
      </label>

      <label>
        Description (max 50 chars)
        <textarea
          rows="3"
          maxLength={50}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>

      <label>
        Images
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/jpg,image/heic,image/heif,image/avif"
          multiple
          onChange={onSelectImages}
        />
      </label>

      {previews.length > 0 && (
        <div className="media-grid">
          {previews.map((src, i) => (
            <div key={i} className="media-thumb">
              <img src={src} alt={`img-${i}`} />
              <button type="button" onClick={() => removeImage(i)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="btn primary" disabled={busy}>
        {busy ? "Adding..." : "Add Product"}
      </button>

      {msg && <div className="toast">{msg}</div>}
    </form>
  </div>
);

}


/* ---------------- ProductList (with Edit) ------------------ */
function ProductList({ products = [], onDelete, token, onUpdated }) {
  const ITEMS_PER_PAGE = 6;
  const [viewer, setViewer] = useState(null);
  const [page, setPage] = useState(1);

  // Edit modal state
  const [editing, setEditing] = useState(null);  
  const [editForm, setEditForm] = useState(null);
  const [existingImages, setExistingImages] = useState([]);  
  const [removedImages, setRemovedImages] = useState([]);  
  const [newImageFiles, setNewImageFiles] = useState([]);  
  const [newPreviews, setNewPreviews] = useState([]);
  const [editBusy, setEditBusy] = useState(false);
  const [editMsg, setEditMsg] = useState("");

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  // Keep page valid when products change
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (products.length === 0) setPage(1);
  }, [products, totalPages, page]);

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const visible = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  function goToPage(n) {
    const p = Math.max(1, Math.min(totalPages, n));
    setPage(p);
  }

  // Open editor modal for product p
  function openEditor(p) {
    setEditing(p);
    setEditForm({
      title: p.title || "",
      price: p.price || "",
      description: p.description || "",
      category: p.category || "Men",
    });
    setExistingImages(Array.isArray(p.images) ? [...p.images] : []);
    setRemovedImages([]);
    setNewImageFiles([]);
    setNewPreviews([]);
    setEditMsg("");
  }

  // Toggle marking an existing image for removal
  function toggleRemoveExistingImage(idx) {
    const url = existingImages[idx];
    const already = removedImages.includes(url);
    if (already) {
      setRemovedImages((r) => r.filter((u) => u !== url));
    } else {
      setRemovedImages((r) => [...r, url]);
    }
  }

  // Handle selection of new images when editing
  function onSelectNewImages(e) {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...previews]);
  }

  function removeNewImage(idx) {
    URL.revokeObjectURL(newPreviews[idx]);
    setNewImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  // Cleanup previews on modal close/unmount
  useEffect(() => {
    return () => {
      newPreviews.forEach((u) => {
        try { URL.revokeObjectURL(u); } catch {}
      });
    };
  }, [newPreviews]);

  // Submit edit
  async function submitEdit(e) {
    e.preventDefault();
    if (!editing) return;
    setEditBusy(true);
    setEditMsg("");
    try {
      const fd = new FormData();
      fd.append("title", editForm.title ?? "");
      fd.append("price", editForm.price ?? "");
      fd.append("description", editForm.description ?? "");
      fd.append("category", editForm.category ?? "");

      // Append new files (if any)
      newImageFiles.forEach((f) => fd.append("images", f));

      // Tell backend which existing URLs to remove (if any)
      if (removedImages.length > 0) {
        fd.append("removedImages", JSON.stringify(removedImages));
      }

      // Send PUT request
      const res = await axios.put(`${API_URL}/${editing._id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditMsg("✅ Product updated");
      // refresh parent list
      if (typeof onUpdated === "function") onUpdated();
      // cleanup and close
      setTimeout(() => {
        setEditing(null);
        setEditForm(null);
        setExistingImages([]);
        setRemovedImages([]);
        newPreviews.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
        setNewImageFiles([]);
        setNewPreviews([]);
        setEditMsg("");
      }, 900);
    } catch (err) {
      console.error("Edit error:", err);
      const em = err?.response?.data?.message || err?.message || "Error updating product";
      setEditMsg(`❌ ${em}`);
    } finally {
      setEditBusy(false);
    }
  }

  return (
    <div className="admin-card">
      <h3>Existing Products ({products.length})</h3>

      {products.length === 0 ? (
        <div className="empty">No products yet.</div>
      ) : (
        <>
          <div className="product-grid">
            {visible.map((p) => (
              <div key={p._id} className="product-item">
                <img src={p.images?.[0]} alt={p.title} onClick={() => setViewer(p)} />
                <div className="info">
                  <h4>{p.title}</h4>
                  <p className="muted">{p.category}</p>
                  {p.price && <p className="price">Rs {p.price}</p>}
                  <div className="actions">
                    <button onClick={() => setViewer(p)}>👁 Preview</button>
                    <button onClick={() => openEditor(p)}>✏️ Edit</button>
                    <button onClick={() => onDelete(p._id)}>🗑 Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="pagination">
            <button className="btn outline" onClick={() => goToPage(page - 1)} disabled={page === 1}>
              ← Prev
            </button>

            <div className="page-numbers" aria-label="Page navigation">
              {renderPageNumbers(page, totalPages, goToPage)}
            </div>

            <button className="btn outline" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
              Next →
            </button>
          </div>
        </>
      )}

      {/* Viewer Modal */}
      {viewer && (
        <div className="modal-overlay" onClick={() => setViewer(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setViewer(null)}>✕</button>
            <h2>{viewer.title}</h2>
            <div className="modal-media">
              {viewer.images?.map((src, i) => (
                <img key={i} src={src} alt={`img-${i}`} />
              ))}
            </div>
            <p>{viewer.description}</p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-box large" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setEditing(null)}>✕</button>
            <h2>Edit: {editing.title}</h2>

            <form className="edit-form" onSubmit={submitEdit}>
            {/* Title field: dropdown + custom input via datalist */}
<label>
  Title *
  <input
    list="watchBrands"
    value={editForm.title}
    onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
    placeholder="Select or type a brand name"
    required
  />
  <datalist id="watchBrands">
    {[
      // 🇵🇰 Local & popular brands
      "Rado",
      "Citizen",
      "Casio",
      "Seiko",
      "Tissot",
      "Titan",
      "Q&Q",
      "Skmei",
      "Curren",
      "Naviforce",
      "Al-Fajr (Islamic Watch)",
      "Swiss Military",
      "Westar",
      "Pierre Cardin",
      "Quartz",
      // 🌍 International luxury brands
      "Rolex",
      "Omega",
      "Tag Heuer",
      "Fossil",
      "Audemars Piguet",
      "Patek Philippe",
      "Hublot",
      "Michael Kors",
      "Diesel",
      "Emporio Armani",
      "Longines",
      "Daniel Wellington",
      "Tommy Hilfiger",
      "Citizen Eco-Drive",
    ].map((brand) => (
      <option key={brand} value={brand} />
    ))}
  </datalist>
</label>


              <label>
                Price
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={editForm.price}
                  onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
                />
              </label>

              <label>
                Category
                <select value={editForm.category} onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Children</option>
                  <option>Imported</option>
                </select>
              </label>

              <label>
                Description
                <textarea value={editForm.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} />
              </label>

              <div style={{ marginBottom: 8 }}>
                <strong>Existing images</strong>
                <div className="media-grid">
                  {existingImages.map((url, i) => {
                    const marked = removedImages.includes(url);
                    return (
                      <div key={i} className={`media-thumb ${marked ? "marked-removed" : ""}`}>
                        <img src={url} alt={`existing-${i}`} />
                        <button type="button" onClick={() => toggleRemoveExistingImage(i)}>{marked ? "Undo" : "✕"}</button>
                      </div>
                    );
                  })}
                </div>
                <small>Click ✕ to mark an existing image for removal</small>
              </div>

              <label>
                Add new images
                <input type="file" accept="image/*" multiple onChange={onSelectNewImages} />
              </label>

              {newPreviews.length > 0 && (
                <div className="media-grid">
                  {newPreviews.map((src, i) => (
                    <div key={i} className="media-thumb">
                      <img src={src} alt={`new-${i}`} />
                      <button type="button" onClick={() => removeNewImage(i)}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn primary" type="submit" disabled={editBusy}>
                  {editBusy ? "Saving..." : "Save changes"}
                </button>
                <button className="btn outline" type="button" onClick={() => setEditing(null)} disabled={editBusy}>
                  Cancel
                </button>
              </div>

              {editMsg && <div className="toast" style={{ marginTop: 8 }}>{editMsg}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* Helper to render page numbers with simple ellipsis */
function renderPageNumbers(currentPage, totalPages, goToPage) {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 4) pages.push("left-ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 3) pages.push("right-ellipsis");
    pages.push(totalPages);
  }

  return pages.map((p, idx) => {
    if (p === "left-ellipsis" || p === "right-ellipsis") {
      return (
        <span key={p + idx} className="ellipsis">
          …
        </span>
      );
    }
    return (
      <button
        key={p}
        className={`page-btn ${p === currentPage ? "active" : ""}`}
        onClick={() => goToPage(p)}
        aria-current={p === currentPage ? "page" : undefined}
      >
        {p}
      </button>
    );
  });
}


