import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Blogs from './pages/Blogs.jsx';
import Contact from './pages/Contact.jsx';
import Us from './pages/Us.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Blog1 from './pages/Blog1.jsx';
import Blog2 from './pages/Blog2.jsx';

import HomeAdmin from './pages/admin-views/HomeAdmin.jsx';
import ProductsAdmin from './pages/admin-views/ProductsAdmin.jsx';
import UserAdmin from './pages/admin-views/UsersAdmin.jsx';

import LoginAdmin from './components/LoginAdmin.jsx';

import SearchResults from './components/SearchResults.jsx';
import ScrollTopButton from './components/ScrollTopButton.jsx';

import AdminRoute from "./components/AdminRoute";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate('/search');
  };

  return (
    <div className="dark-page">

      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Us />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults searchQuery={searchQuery} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />

        {/* ADMIN RUTAS PROTEGIDAS */}
        <Route
          path="/home-admin"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/product-admin"
          element={
            <AdminRoute>
              <ProductsAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/user-admin"
          element={
            <AdminRoute>
              <UserAdmin />
            </AdminRoute>
          }
        />

        <Route path="/login-admin" element={<LoginAdmin />} />
      </Routes>

      <Footer />
      <ScrollTopButton />
    </div>
  );
}
