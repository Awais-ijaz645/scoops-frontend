import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronRight, ChevronLeft, Check, IceCream, Candy, Droplets } from 'lucide-react';

// Background Import
import homeBg from '../assets/home.jpg';

const Customizer = () => {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    base: '',
    toppings: [],
    syrup: '',
    price: 8.50
  });

  const bases = [
    { name: 'Vanilla', color: 'bg-white text-gray-800' },
    { name: 'Chocolate', color: 'bg-[#4b2c20] text-white border-white/20' },
    { name: 'Strawberry', color: 'bg-pink-400 text-white' },
    { name: 'Mango', color: 'bg-orange-400 text-white' }
  ];

  const toppingsList = ['Oreo Crumbs', 'Chocolate Chips', 'Mixed Nuts', 'Sprinkles', 'Marshmallows'];
  const syrups = ['Chocolate', 'Caramel', 'Strawberry', 'Honey'];

  const toggleTopping = (topping) => {
    setSelection(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter(t => t !== topping)
        : [...prev.toppings, topping]
    }));
  };

  const handleFinish = () => {
    const finalItem = {
      name: `Custom Sundae`,
      details: `${selection.base} base, ${selection.toppings.join(', ')}, ${selection.syrup} syrup`,
      price: selection.price,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400"
    };
    addToCart(finalItem);
    alert("Sundae added to cart!");
    setStep(1);
    setSelection({ base: '', toppings: [], syrup: '', price: 8.50 });
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="absolute inset-0 bg-[#1a0b2e]/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          
          <div className="flex items-center justify-between mb-12">
            {[
              { id: 1, label: 'Base', icon: <IceCream size={16}/> },
              { id: 2, label: 'Toppings', icon: <Candy size={16}/> },
              { id: 3, label: 'Syrup', icon: <Droplets size={16}/> }
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 w-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? 'bg-[#ffc95e] border-[#ffc95e] text-[#2d2141] shadow-[0_0_15px_rgba(255,201,94,0.4)]' : 'border-white/20 text-white/40'}`}>
                  {step > s.id ? <Check size={20} /> : s.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-[#ffc95e]' : 'text-white/30'}`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="min-h-[350px]">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl md:text-5xl font-black text-white italic mb-8 drop-shadow-lg">Select your <span className="text-[#ffc95e]">base</span> flavor</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bases.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => { setSelection({ ...selection, base: b.name }); setStep(2); }}
                      className={`h-32 rounded-[2rem] font-black uppercase text-sm hover:scale-105 transition active:scale-95 border-2 border-transparent hover:border-white/20 ${b.color} shadow-2xl`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-4xl md:text-5xl font-black text-white italic mb-2 drop-shadow-lg">Add some <span className="text-[#ffc95e]">crunch</span></h2>
                <p className="text-white/60 font-medium mb-8">Select your favorite toppings</p>
                <div className="flex flex-wrap gap-3">
                  {toppingsList.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTopping(t)}
                      className={`px-8 py-4 rounded-full border-2 font-black uppercase text-[10px] tracking-widest transition-all ${selection.toppings.includes(t) ? 'bg-[#ffc95e] border-[#ffc95e] text-[#2d2141] shadow-lg' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white italic mb-8 drop-shadow-lg">Final <span className="text-[#ffc95e]">Drizzle</span></h2>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {syrups.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelection({ ...selection, syrup: s })}
                      className={`py-6 rounded-2xl border-2 font-black uppercase text-xs tracking-widest transition-all ${selection.syrup === s ? 'bg-[#ffc95e] border-[#ffc95e] text-[#2d2141] shadow-lg' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-white/50 font-black uppercase text-[10px] tracking-widest hover:text-white transition">
                <ChevronLeft size={16} /> Back
              </button>
            ) : <div />}

            {step === 2 && (
              <button 
                disabled={selection.toppings.length === 0}
                onClick={() => setStep(3)} 
                className="bg-[#ffc95e] text-[#2d2141] px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition disabled:opacity-30 shadow-xl"
              >
                Next Step <ChevronRight size={16} />
              </button>
            )}

            {step === 3 && (
              <button 
                disabled={!selection.syrup}
                onClick={handleFinish}
                className="bg-green-600 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-green-500 transition shadow-2xl disabled:opacity-30 border border-white/10"
              >
                Finish My Sundae
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;