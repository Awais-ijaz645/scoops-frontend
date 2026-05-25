import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-[#1a112e] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ffc95e]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="group cursor-default">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-white">
                THE SCOOPS<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc95e] to-[#f59e0b]">ARTIST</span>
              </h2>
              <div className="h-1.5 w-20 bg-[#ffc95e] mt-6 rounded-full group-hover:w-40 transition-all duration-700"></div>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed max-w-sm">
              Crafting artisanal desserts since 1999. Every scoop is a masterpiece.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[#ffc95e] font-black text-sm uppercase tracking-[0.4em]">Navigation</h3>
            <ul className="space-y-5">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-lg font-bold transition-all flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#ffc95e] opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-4 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-white text-lg font-bold transition-all flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#ffc95e] opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-4 transition-all duration-300"></span>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-lg font-bold transition-all flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#ffc95e] opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-4 transition-all duration-300"></span>
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/customizer" className="text-gray-300 hover:text-white text-lg font-bold transition-all flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#ffc95e] opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-4 transition-all duration-300"></span>
                  Customizer
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <h3 className="text-[#ffc95e] font-black text-sm uppercase tracking-[0.4em]">Boutique</h3>
            <div className="space-y-8">
              <div>
                <p className="text-white font-black text-xl mb-2">Okara, Pakistan</p>
                <p className="text-gray-400 text-lg">Main Campus, COMSATS Road</p>
              </div>
              <div className="pt-8 border-t border-white/10">
                {/* Increased text size and bold weight */}
                <p className="text-[#ffc95e] font-black text-2xl md:text-xl mb-2 hover:tracking-wide transition-all duration-500 cursor-pointer">
                  awaisraj798@gmail.com
                </p>
                <p className="text-gray-500 text-sm font-black uppercase tracking-[0.2em]">+92 320 7319273</p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 text-[10px] font-bold tracking-[0.6em] uppercase">
            © 2026 THE SCOOPS ARTIST.
          </p>
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/10"></div>
            <span className="text-white text-xs font-black tracking-[0.4em] uppercase">
              Built by the Leadership Team
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;