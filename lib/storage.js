// simple localStorage-backed product storage (mock)
// use for demo / looking-only
const KEY = "timepiece_products_v1";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export const storage = {
  getProducts() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveProducts(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  },

  addProduct({ title, price, description, category, images = [], video }) {
    const products = storage.getProducts();
    const newP = {
      id: uid(),
      title: title || "Untitled",
      price: price || "",
      desc: description || "",
      category: category || "Men",
      images: Array.isArray(images) ? images : [],
      video: video || null,
      createdAt: Date.now(),
    };
    products.unshift(newP);
    storage.saveProducts(products);
    return newP;
  },

  deleteProduct(id) {
    const products = storage.getProducts().filter((p) => p.id !== id);
    storage.saveProducts(products);
    return products;
  },

  verifyPassword(pass) {
    // demo-only: password is 'admin' (change if you like)
    return pass === "admin";
  },
};
