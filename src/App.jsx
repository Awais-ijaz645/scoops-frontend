import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Context and Hooks
import { CartProvider, useCart } from './context/CartContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 2. Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Customizer from './pages/Customizer';
import CartPage from './pages/CartPage'; 
import Contact from './pages/Contact';
import AdminPanel from './components/AdminPanel';

// FIX 1: Import the Checkout component correctly
import Checkout from './pages/Checkout'; 

const AppRoutes = () => {
  // FIX 2: Use the correct variable name from your Context
  // If your context uses 'total', use that instead of calculateTotal()
  const { cart, total } = useCart(); 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu type="all" />} /> 
      <Route path="/ice-cream" element={<Menu type="ice-cream" />} />
      <Route path="/coffee" element={<Menu type="coffee" />} />
      <Route path="/customizer" element={<Customizer />} />
      <Route path="/sundae" element={<Customizer />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminPanel />} />
      
      {/* Passing 'total' instead of a function call to fix the TypeError */}
      <Route 
        path="/checkout" 
        element={<Checkout cartItems={cart} totalAmount={total} />} 
      />
    </Routes>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#2d2141] selection:bg-[#ffc95e] selection:text-[#2d2141] flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;