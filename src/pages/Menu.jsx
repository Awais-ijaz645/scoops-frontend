import React from 'react';
import { menuData } from '../data/products';
import ProductCard from '../components/ProductCard';

import homeBg from '../assets/home.jpg';

const Menu = ({ type }) => {
  
  let products = [];
  let title = "The Artist's Gallery";

  if (type === 'ice-cream') {
    products = menuData.iceCream;
    title = "Ice Cream Flavors";
  } else if (type === 'coffee') {
    products = menuData.coffee;
    title = "Coffee Specials";
  } else if (type === 'canvas') {
    products = menuData.canvas;
    title = "The Canvas Collection";
  } else if (type === 'palette') {
    products = menuData.palettes;
    title = "Artisan Palettes";
  } else {
    products = [
      ...menuData.canvas,
      ...menuData.palettes,
      ...menuData.iceCream, 
      ...menuData.coffee
    ];
    title = "Our Full Gallery";
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      
      
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="absolute inset-0 bg-[#1a0b2e]/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 pt-32 px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          
          <p className="text-[#ffc95e] font-black uppercase tracking-[0.4em] text-[10px] mb-4 opacity-80">
            Curated Selection
          </p>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic mb-20 drop-shadow-2xl tracking-tighter">
            {title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="menu-card-animated transition-transform hover:scale-105 duration-500 shadow-2xl h-full"
              >
                <div className="menu-card-content h-full">
                  <ProductCard product={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .drop-shadow-2xl {
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.6));
        }
        /* Ensure the animated wrapper maintains a consistent height for the grid */
        .menu-card-animated {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Menu;