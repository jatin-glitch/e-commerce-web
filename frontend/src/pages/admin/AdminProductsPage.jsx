import { useEffect, useState } from 'react';
import api from '../../lib/api.js';

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  stock: '',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditing(null);
    setForm(emptyProduct);
  };

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      imageUrl: p.imageUrl || '',
      stock: String(p.stock ?? 0),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl || undefined,
        stock: Number(form.stock || 0),
      };

      if (editing) {
        await api.put(`/products/${editing}`, payload);
      } else {
        await api.post('/products', payload);
      }
      await load();
      resetForm();
    } catch (err) {
      console.error('Save product failed', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      await load();
    } catch (err) {
      console.error('Delete product failed', err);
    }
  };

  return (
    <div className="stack-v">
      <section className="section">
        <h1 className="page-title">Admin – products</h1>
        <p className="page-subtitle">
          Create and maintain the items available in the storefront.
        </p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="price">Price (PKR)</label>
            <input
              id="price"
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              required
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              id="imageUrl"
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
            />
          </div>
          <div
            className="stack-h"
            style={{ gridColumn: '1 / -1', justifyContent: 'flex-end' }}
          >
            {editing && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving
                ? 'Saving…'
                : editing
                ? 'Save changes'
                : 'Create product'}
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <div className="stack-h-between">
          <h2 className="page-title">Existing products</h2>
          <span className="muted text-sm">
            {products.length} item{products.length === 1 ? '' : 's'}
          </span>
        </div>
        <table className="table mt-1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th style={{ width: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>PKR {p.price?.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td>
                  <div className="stack-h">
                    <button
                      type="button"
                      className="btn btn-ghost text-sm"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost text-sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <span className="muted">No products yet.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

