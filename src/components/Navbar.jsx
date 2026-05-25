import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center px-12 py-6 bg-[#2d2141] text-white sticky top-0 z-50 border-b border-white/5">
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
        <Link to="/" className="hover:text-[#ffc95e] transition">Home</Link>
        <Link to="/ice-cream" className="hover:text-[#ffc95e] transition">Ice Cream</Link>
        <Link to="/coffee" className="hover:text-[#ffc95e] transition">Coffee</Link>
        <Link to="/about" className="hover:text-[#ffc95e] transition">Our Story</Link>
        <Link to="/contact" className="hover:text-[#ffc95e] transition">Contact</Link>
      </div>

      <div className="text-center group cursor-pointer">
        
        <h2 className="text-2xl font-black tracking-tighter group-hover:scale-110 transition-transform">
          THE SCOOPS ARTIST
        </h2>
        <div className="h-0.5 w-full bg-[#ffc95e] scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </div>

      <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
        <Link to="/sundae" className="hover:text-[#ffc95e] transition">Build Sundae</Link>
        <Link to="/cart" className="relative flex items-center gap-2 bg-[#1d331d] px-5 py-2 rounded-full border border-white/10 hover:bg-green-900 transition">
          <ShoppingCart size={14} className="text-[#ffc95e]" />
          <span>Cart</span>
          <span className="bg-[#ffc95e] text-[#2d2141] w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
            {cart.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;