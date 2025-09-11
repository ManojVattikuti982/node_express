import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    productName: "",
    price: 0,
    quantity: 0,
    category: "stationery",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create product
  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5000/products", form);
      setForm({ productName: "", price: 0, quantity: 0, category: "stationery" });
      fetchProducts();
    } catch (err) {
      alert("Error creating product");
    }
  };

  // Clear form
  const handleClear = () => {
    setForm({ productName: "", price: 0, quantity: 0, category: "stationery" });
  };

  return (
    <div>
      <h2>Create a Product</h2>
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="stationery">Stationery</option>
        <option value="kitchen">Kitchen</option>
        <option value="electronics">Electronics</option>
        <option value="apparels">Apparels</option>
      </select>
      <button onClick={handleCreate}>Create Product</button>
      <button onClick={handleClear}>Clear</button>

      <h2>List of Products</h2>
      <ul>
        {loading ? (
          <h3>Fetching products...</h3>
        ) : products.length > 0 ? (
          products.map((p) => (
            <li key={p._id}>
              {p.productName} - ${p.price} - {p.quantity} units - {p.category}
            </li>
          ))
        ) : (
          <h3>No products found. Please add some products.</h3>
        )}
      </ul>
    </div>
  );
}
