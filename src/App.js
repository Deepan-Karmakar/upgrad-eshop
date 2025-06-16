import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Products from './components/products/Products';
import ProductDetails from './components/productDetails/ProductDetails';
import CreateOrder from './components/createOrder/CreateOrder';
import AddProduct from './components/addProduct/AddProduct';
import ModifyProduct from './components/modifyProduct/ModifyProduct';
import ProtectedRoute from './common/ProtectedRoute';
import './App.css';

function App() {
  // We'll assume a role for now. A real app would get this from the login response.
  const userRole = "admin"; // Can be "user" or "admin"

  return (
    <Router>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Products userRole={userRole} />} />
            <Route path="/products" element={<Products userRole={userRole} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/modify-product/:id" element={<ModifyProduct />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;