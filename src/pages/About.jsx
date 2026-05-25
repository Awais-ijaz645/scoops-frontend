import React from 'react';
import homeBg from '../assets/home.jpg';

// Team Image Imports
import imageZ from '../assets/z.jpeg';
import imageA from '../assets/a.jpeg';
import imageS from '../assets/s.jpeg';
import imageAR from '../assets/AR.jpeg';

const About = () => {
  const team = [
    { 
      name: "Awais Ijaz", 
      role: "Owner / Visionary", 
      bio: "The creative force behind the brand, ensuring every scoop meets our artistic gold standard.",
      img: imageA 
    },
    { 
      name: "Saad", 
      role: "Operations Lead", 
      bio: "Specializing in operational logic and ensuring a seamless, high-end customer experience.",
      img: imageS 
    },
    { 
      name: "Zain", 
      role: "Strategic Director", 
      bio: "Focusing on brand growth and maintaining our boutique artistic aesthetics.",
      img: imageZ 
    },
    { 
      name: "Awais Raza", 
      role: "Lead Designer", 
      bio: "Shaping the company's visual identity through sophisticated and artistic concepts.",
      img: imageAR 
    }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans">
      
      {/* --- SHARED BACKGROUND LAYER --- */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="absolute inset-0 bg-[#1a0b2e]/20 backdrop-blur-[2px]"></div>
      </div>

      {/* --- PAGE CONTENT --- */}
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        
        <div className="container mx-auto relative">
          
          {/* --- HERO STORY SECTION --- */}
          <div className="max-w-6xl mx-auto mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-[#ffc95e] italic text-xl font-medium mb-4 tracking-widest">Our Legacy</h2>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
                THE SCOOPS <br /> <span className="text-transparent stroke-text">ARTIST</span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed max-w-lg">
                Founded in <span className="text-white font-bold italic">1999</span>, we believe that every dessert is a masterpiece. Our team crafts ice cream and cold brews that are an artistic experience.
              </p>
              <div className="p-8 bg-black/30 backdrop-blur-md rounded-[2.5rem] border border-white/10 italic shadow-2xl inline-block text-[#ffc95e]/80">
                "Turning every 'chill' moment into a gallery-worthy memory."
              </div>
            </div>

            {/* --- HERO IMAGE (SMALLER SIZE + POETIC OVERLAY) --- */}
            <div className="flex justify-center md:justify-end">
              <div className="post-card-container group shadow-2xl relative z-10 border border-white/20 max-w-sm md:max-w-md w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Our Craft" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                
                <div className="post-overlay">
                  <div className="text-center w-full">
                    <h2 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tighter">
                      Signature <br /><span className="text-[#ffc95e]">Masterpiece</span>
                    </h2>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em] mb-10 border-b border-white/10 pb-4 inline-block">
                      Hand-crafted since 1999
                    </p>
                    <div className="space-y-4 px-2">
                      <p className="text-white text-xl md:text-2xl font-serif italic leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                        Discover our most <br /> celebrated blend, where <br /> every element is <br />
                        <span className="text-[#ffc95e] font-bold not-italic">harmonized</span> into an <br /> artist's vision.
                      </p>
                    </div>
                    <div className="mt-12 text-white/100 font-serif italic text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
                      — Curated by The Artist —
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

       {/* --- MEET THE TEAM (COMPACT 3D FLIP) --- */}
<div className="pt-10 border-t border-white/10 max-w-7xl mx-auto">
  <div className="text-center mb-10">
    <h2 className="text-[#ffc95e] font-black uppercase tracking-[0.3em] text-[10px] mb-1">The Leadership</h2>
    <h3 className="text-4xl font-black drop-shadow-lg uppercase tracking-tight">Meet the Team</h3>
  </div>

  {/* Reduced height to h-[380px] to fit heading and cards on one screen */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
    {team.map((member, index) => (
      <div key={index} className="flip-card-container group h-[380px]">
        <div className="flip-card-inner">
          
          {/* FRONT: Photo + Name */}
          <div className="flip-card-front menu-card-animated">
            <div className="menu-card-content h-full p-3 flex flex-col">
              {/* Image takes 75% of card height now */}
              <div className="relative w-full h-[75%] overflow-hidden rounded-[1.8rem] border border-white/10">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center py-2">
                <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-tight">{member.name}</h4>
               
              </div>
            </div>
          </div>

          {/* BACK: Role + Bio */}
          <div className="flip-card-back bg-[#1a0b2e]/95 backdrop-blur-2xl border-2 border-[#ffc95e]/30 rounded-[2.5rem] p-6 flex flex-col justify-center items-center text-center">
            <div className="mb-4">
              <span className="text-[#ffc95e] text-[12px] font-black uppercase tracking-[0.2em] bg-[#ffc95e]/10 px-3 py-1.5 rounded-full border border-[#ffc95e]/20">
                {member.role}
              </span>
            </div>
            <h4 className="text-xl font-black text-white uppercase mb-2 tracking-tighter">{member.name}</h4>
            <div className="w-8 h-[2px] bg-[#ffc95e] mb-4 rounded-full"></div>
            <p className="text-white text-xl md:text-2xl font-serif italic leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
              {member.bio}
            </p>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text { -webkit-text-stroke: 1.5px white; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default About;