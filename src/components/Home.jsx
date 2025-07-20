import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Home() {
  const { cart, setCart, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError("");
      const url = `${API_URL}/api/products/?page=1&limit=8&search=`;
      const result = await axios.get(url);
      setProducts(result.data.products || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item._id === product._id 
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    // Show success message (could use toast)
  };

  const buyNow = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleLoginToBuy = () => {
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-primary">MERN Store</span>
          </h1>
          <div className="flex justify-center gap-4">
            <a href="#products" className="btn btn-primary btn-sm md:btn-lg">
              Shop Now
            </a>
            <a href="/cart" className="btn btn-secondary btn-sm md:btn-lg">
              View Cart ({cart.length})
            </a>
          </div>
        </div>

        {/* Featured Products */}
        <div id="products" className="mb-10">
          <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>
          {isLoading && (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}
          {error && (
            <div className="alert alert-error mb-6">
              {error}
            </div>
          )}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold mb-2">No Products Available</h3>
              <p className="text-gray-600">Check back later for new products!</p>
            </div>
          )}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="card p-2 shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center bg-white border border-gray-100 rounded-lg"
                  style={{ minWidth: 0 }}
                >
                  <img
                    src={product.imgUrl || "https://via.placeholder.com/160x120?text=No+Image"}
                    alt={product.productName}
                    className="w-32 h-24 object-cover rounded-md mb-2 border"
                    style={{ maxWidth: "100%", maxHeight: "96px" }}
                    onError={e => {
                      e.target.src = "https://via.placeholder.com/160x120?text=No+Image";
                    }}
                  />
                  <div className="w-full flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-sm mb-1 truncate" title={product.productName}>
                      {product.productName}
                    </h3>
                    <p className="text-gray-500 text-xs mb-1 line-clamp-2" style={{ minHeight: "32px" }}>
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-primary font-bold text-base">${product.price}</span>
                      <span className="text-gray-400 text-xs">
                        {cart.find(item => item._id === product._id)?.qty || 0} in cart
                      </span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <button
                        onClick={() => addToCart(product)}
                        className="btn btn-primary btn-xs flex-1"
                        style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                      >
                        Add
                      </button>
                      {user?.token ? (
                        <button
                          onClick={() => buyNow(product)}
                          className="btn btn-success btn-xs flex-1"
                          style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                        >
                          Buy
                        </button>
                      ) : (
                        <button
                          onClick={handleLoginToBuy}
                          className="btn btn-secondary btn-xs flex-1"
                          style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                        >
                          Login
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoading && !error && products.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/admin/products")}
                className="btn btn-primary btn-sm"
              >
                View All Products
              </button>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="text-base font-semibold mb-1">Free Shipping</h3>
            <p className="text-gray-600 text-xs">Free shipping on all orders over $50</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="text-base font-semibold mb-1">Secure Payment</h3>
            <p className="text-gray-600 text-xs">100% secure payment processing</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">↩️</div>
            <h3 className="text-base font-semibold mb-1">Easy Returns</h3>
            <p className="text-gray-600 text-xs">30-day return policy for all products</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card bg-primary text-white text-center p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Ready to Shop?</h2>
          <p className="text-base mb-4 opacity-90">
            Join thousands of satisfied customers who trust MERN Store for their shopping needs.
          </p>
          <div className="flex justify-center gap-2">
            {!user?.token ? (
              <>
                <a href="/register" className="btn btn-secondary btn-sm md:btn-lg">
                  Create Account
                </a>
                <a href="/login" className="btn btn-white btn-sm md:btn-lg">
                  Sign In
                </a>
              </>
            ) : (
              <a href="/cart" className="btn btn-secondary btn-sm md:btn-lg">
                View Cart ({cart.length} items)
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}