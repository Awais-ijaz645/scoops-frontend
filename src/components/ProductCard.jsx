import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-5 border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 overflow-hidden">
      
      {/* Decorative Gradient Glow (Top Corner) */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffc95e]/10 rounded-full blur-3xl group-hover:bg-[#ffc95e]/20 transition-colors"></div>

      {/* Product Image Wrapper */}
      <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[2rem]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{product.category || 'Premium'}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-black text-white leading-tight max-w-[70%]">
            {product.name}
          </h3>
          <div className="text-right">
            <span className="text-[#ffc95e] font-black text-2xl">Rs {product.price}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          Experience the artistic blend of premium ingredients and aesthetic presentation.
        </p>

        <button 
          onClick={() => addToCart(product)}
          className="w-full mt-2 bg-white/10 hover:bg-[#ffc95e] text-white hover:text-[#2d1b4d] py-4 rounded-2xl border border-white/10 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest transition-all active:scale-95 group-hover:shadow-[0_10px_30px_rgba(255,201,94,0.2)]"
        >
          <Plus size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
