import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png'; 

// Background Import
import homeBg from '../assets/home.jpg'; 

// Asset Imports
import I1 from '../assets/I1.jpeg';
import I2 from '../assets/I2.jpeg';
import I3 from '../assets/I3.jpeg';
import I4 from '../assets/I4.jpeg';
import I5 from '../assets/I5.jpeg';
import C1 from '../assets/C1.jpeg';
import C2 from '../assets/C2.jpeg';
import C3 from '../assets/C3.jpeg';
import C4 from '../assets/C4.jpeg';
import C5 from '../assets/C5.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const [activeMasterpiece, setActiveMasterpiece] = useState(0);

  const masterpieces = [
    { 
      title: "Midnight Dark Chocolate", 
      desc: "70% cocoa blend for the true chocolate purist.", 
      price: "$5.5", 
      tag: "Best Seller",
      image: I1 
    },
    { 
      title: "Signature Cold Brew", 
      desc: "18-hour steep for a smooth, low-acid kick.", 
      price: "$4.5", 
      tag: "Limited",
      image: C1 
    },
    { 
      title: "Pistachio Masterpiece", 
      desc: "Hand-roasted Iranian pistachios in velvet cream.", 
      price: "$4", 
      tag: "Chef's Choice",
      image: I2 
    },
    { 
      title: "Velvet Vanilla Latte", 
      desc: "Smooth espresso paired with premium bean vanilla.", 
      price: "$6", 
      tag: "Classic",
      image: C2 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMasterpiece((prev) => (prev + 1) % masterpieces.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [masterpieces.length]);

  return (
    <div className="text-white relative overflow-x-hidden min-h-screen">
      
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="absolute inset-0 bg-[#1a0b2e]/20 backdrop-blur-[2px]"></div>
      </div>

      {/* --- BACKGROUND GLOWS (Now placed on top of the image) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ffc95e] opacity-10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#6366f1] opacity-20 rounded-full blur-[100px]"></div>
      </div>

      {/* --- SECTION 1: HERO --- */}
      <section className="min-h-screen flex items-center relative z-10 pt-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center py-20">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-block px-4 py-1 rounded-full border border-[#ffc95e]/30 bg-[#ffc95e]/10 text-[#ffc95e] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Premium Dessert Boutique
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] mb-8 tracking-tighter">
              CHILL <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#ffc95e] italic">VIBES</span>
            </h1>
            <p className="text-gray-300 max-w-md text-lg leading-relaxed mb-10 mx-auto md:mx-0 font-medium">
              Experience the fusion of taste and aesthetics at <span className="text-white font-bold italic underline decoration-[#ffc95e]">The Scoops Artist</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-5">
              <button onClick={() => navigate('/menu')} className="group relative bg-[#ffc95e] text-[#2d1b4d] px-10 py-5 rounded-2xl font-black uppercase text-sm transition-all hover:shadow-[0_20px_40px_rgba(255,201,94,0.3)] hover:-translate-y-1">
                Explore Menu
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative mt-20 md:mt-0 flex justify-center">
            <div className="relative z-10 floating-hero group">
               <div className="absolute inset-[-40px] border-[1px] border-dashed border-white/10 rounded-full animate-spin-slow"></div>
               <img src={heroImg} alt="Hero" className="relative z-10 rounded-[3rem] shadow-2xl w-full max-w-lg transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: DAILY MASTERPIECES SLIDER --- */}
      <section className="py-32 relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-[#ffc95e] text-xs font-black uppercase tracking-[0.5em] mb-4">Today's Canvas</h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                The <span className="text-transparent" style={{ WebkitTextStroke: '1px #ffc95e' }}>Artist's</span> Specials
              </h3>
            </div>
            <div className="flex gap-4">
              {masterpieces.map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setActiveMasterpiece(idx)} 
                    className={`h-1 transition-all duration-500 rounded-full ${activeMasterpiece === idx ? 'w-16 bg-[#ffc95e]' : 'w-8 bg-white/10'}`} 
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div key={activeMasterpiece} className="lg:col-span-5 space-y-8 animate-fade-in">
              <div className="inline-block px-4 py-1 rounded-full border border-[#ffc95e]/30 bg-[#ffc95e]/10">
                <span className="text-[#ffc95e] text-[10px] font-black uppercase tracking-widest">{masterpieces[activeMasterpiece].tag}</span>
              </div>
              <h4 className="text-white text-5xl font-black uppercase tracking-tight leading-none">{masterpieces[activeMasterpiece].title}</h4>
              <p className="text-gray-300 text-lg leading-relaxed">{masterpieces[activeMasterpiece].desc}</p>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-black tracking-widest mb-1">Price</span>
                  <span className="text-3xl font-black text-[#ffc95e]">{masterpieces[activeMasterpiece].price}</span>
                </div>
                <button className="flex-1 bg-white text-[#2d1b4d] font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-[#ffc95e] transition-all">Order Now</button>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md aspect-square bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                <img 
                    key={activeMasterpiece} 
                    src={masterpieces[activeMasterpiece].image} 
                    alt="Masterpiece" 
                    className="w-full h-full object-cover animate-reveal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: LIVE STATS --- */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Scoops Served", val: "50k+" },
            { label: "Coffee Blends", val: "12" },
            { label: "Happy Clients", val: "99%" },
            { label: "Years Crafting", val: "25" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <h5 className="text-5xl md:text-6xl font-black text-[#ffc95e] tracking-tighter">{stat.val}</h5>
              <p className="text-[10px] text-white/60 uppercase font-black tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .floating-hero { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes reveal { from { transform: scale(1.1); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Home;