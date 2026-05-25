import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

import homeBg from '../assets/home.jpg';

const CartPage = () => {
  const { cart, removeFromCart, total } = useCart();
  const navigate = useNavigate(); // Initialize the navigation hook

  const BackgroundLayer = () => (
    <div 
      className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="absolute inset-0 bg-[#1a0b2e]/20 backdrop-blur-[2px]"></div>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="relative min-h-screen text-white overflow-hidden">
        <BackgroundLayer />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
          <div className="bg-black/20 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 flex flex-col items-center shadow-2xl">
            <ShoppingBag size={80} className="text-[#ffc95e] mb-8 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black italic uppercase text-center tracking-tighter">
              Your cart is <span className="text-[#ffc95e]">empty</span>
            </h2>
            <Link to="/menu" className="mt-10 bg-[#ffc95e] text-[#2d2141] px-12 py-4 rounded-2xl font-black uppercase text-sm hover:scale-105 transition shadow-xl">
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <BackgroundLayer />

      <div className="relative z-10 pt-32 px-6 md:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white italic mb-12 uppercase tracking-tighter drop-shadow-2xl">
            Your <span className="text-[#ffc95e]">Order</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div 
                  key={item.cartId} 
                  className="flex items-center bg-black/30 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] group hover:border-[#ffc95e]/30 transition-all duration-300 shadow-xl"
                >
                  <img src={item.image} className="w-24 h-24 rounded-[1.5rem] object-cover border border-white/10 shadow-lg" alt={item.name} />
                  <div className="ml-6 flex-grow">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{item.name}</h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Premium Selection</p>
                    <p className="text-[#ffc95e] font-black text-2xl mt-2">Rs. {item.price.toFixed(0)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartId)} 
                    className="p-4 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-black/50 border border-white/10 p-8 rounded-[3rem] sticky top-32 backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffc95e]/10 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Summary</h2>
                
                <div className="space-y-5 mb-10">
                  <div className="flex justify-between text-white/70 font-bold uppercase text-xs tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">Rs. {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70 font-bold uppercase text-xs tracking-widest">
                    <span>Delivery</span>
                    <span className="text-green-400 font-black">FREE</span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />
                  
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-black text-white uppercase tracking-tighter">Total</span>
                    <div className="text-right">
                      <span className="text-4xl font-black text-[#ffc95e] drop-shadow-[0_0_15px_rgba(255,201,94,0.4)]">
                        Rs. {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Updated Button to navigate to /checkout */}
                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-[#ffc95e] text-[#2d2141] py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                >
                  Checkout <ArrowRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;