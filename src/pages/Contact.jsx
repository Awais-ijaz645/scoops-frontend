import React, { useState } from 'react';
import homeBg from '../assets/home.jpg';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    item: '',
    rating: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (activeTab === 'contact') {
      if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.message.trim()) newErrors.message = "Please enter a message";
    } else {
      if (!formData.item) newErrors.item = "Please select an item";
      if (!formData.rating || formData.rating === "Select rating") newErrors.rating = "Rating is required";
      if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Direct the request to the correct backend route
      const endpoint = activeTab === 'contact' ? '/api/contact' : '/api/feedback';
      
      try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          alert(activeTab === 'contact' ? "Message Sent Successfully!" : "Feedback Submitted!");
          // Reset form fields
          setFormData({ fullName: '', email: '', message: '', item: '', rating: '', feedback: '' });
        } else {
          alert("Server Error: " + (result.error || "Could not save data."));
        }
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Failed to connect to the server. Please check if your backend is running.");
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="absolute inset-0 bg-[#1a0b2e]/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl relative">
          
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-[#ffc95e] text-xs font-black uppercase tracking-[0.4em] mb-4">Connect With Us</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-white drop-shadow-2xl">
              Let's <span className="text-[#ffc95e]">Talk</span>
            </h1>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white/10 p-1.5 rounded-full border border-white/20 flex backdrop-blur-md">
              <button 
                onClick={() => { setActiveTab('contact'); setErrors({}); }}
                className={`px-10 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'contact' ? 'bg-[#ffc95e] text-[#2d1b4d] shadow-lg' : 'text-white hover:text-[#ffc95e]'}`}
              >
                General Inquiry
              </button>
              <button 
                onClick={() => { setActiveTab('feedback'); setErrors({}); }}
                className={`px-10 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'feedback' ? 'bg-[#ffc95e] text-[#2d1b4d] shadow-lg' : 'text-white hover:text-[#ffc95e]'}`}
              >
                Menu Feedback
              </button>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 md:p-14 shadow-2xl">
            {activeTab === 'contact' ? (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ffc95e] ml-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-[#ffc95e] focus:outline-none transition-all text-white placeholder:text-white/30 font-medium`} 
                    placeholder="Enter your name" 
                  />
                  {errors.fullName && <p className="text-red-400 text-[10px] font-bold uppercase ml-3 italic">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ffc95e] ml-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-[#ffc95e] focus:outline-none transition-all text-white placeholder:text-white/30 font-medium`} 
                    placeholder="hello@example.com" 
                  />
                  {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase ml-3 italic">{errors.email}</p>}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ffc95e] ml-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-3xl px-6 py-4 focus:border-[#ffc95e] focus:outline-none transition-all text-white placeholder:text-white/30 font-medium`} 
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-[10px] font-bold uppercase ml-3 italic">{errors.message}</p>}
                </div>
                <button type="submit" className="md:col-span-2 bg-[#ffc95e] text-[#2d1b4d] font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  Send Message
                </button>
              </form>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ffc95e] ml-2">What did you try?</label>
                    <select 
                      name="item"
                      value={formData.item}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.item ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-[#ffc95e] focus:outline-none transition-all text-sm text-white font-bold appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="bg-[#1a0b2e]">Select from our menu</option>
                      <optgroup label="Ice Cream Masterpieces" className="bg-[#1a0b2e] text-white">
                        <option value="classic-vanilla">Classic Vanilla Bean</option>
                        <option value="dark-chocolate">Midnight Dark Chocolate</option>
                        <option value="pistachio">Artisanal Pistachio</option>
                        <option value="strawberry">Fresh Strawberry Fields</option>
                        <option value="mango-tang">Tropical Mango Tang</option>
                      </optgroup>
                      <optgroup label="Artisanal Coffee" className="bg-[#1a0b2e] text-white">
                        <option value="cold-brew">Signature Cold Brew</option>
                        <option value="espresso">Double Shot Espresso</option>
                        <option value="latte">Velvet Vanilla Latte</option>
                        <option value="cappuccino">Frosted Cappuccino</option>
                        <option value="mocha">Dark Mocha Fusion</option>
                      </optgroup>
                    </select>
                    {errors.item && <p className="text-red-400 text-[10px] font-bold uppercase ml-3 italic">{errors.item}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#ffc95e] ml-2">How was it?</label>
                    <select 
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.rating ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-[#ffc95e] focus:outline-none transition-all text-sm text-white font-bold appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-[#1a0b2e]">Select rating</option>
                      <option value="best" className="bg-[#1a0b2e]">Best (Masterpiece)</option>
                      <option value="average" className="bg-[#1a0b2e]">Average (Good)</option>
                      <option value="worst" className="bg-[#1a0b2e]">Worst (Needs improvement)</option>
                    </select>
                    {errors.rating && <p className="text-red-400 text-[10px] font-bold uppercase ml-3 italic">{errors.rating}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#ffc95e] ml-2">Your Advice or Feedback</label>
                  <textarea 
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    rows="4" 
                    className={`w-full bg-white/5 border ${errors.feedback ? 'border-red-500' : 'border-white/10'} rounded-3xl px-6 py-4 focus:border-[#ffc95e] focus:outline-none transition-all text-white placeholder:text-white/30 font-medium`} 
                    placeholder="Tell us how we can make your experience even better..."
                  ></textarea>
                  {errors.feedback && <p className="text-red-400 text-[10px] font-bold uppercase ml-3 italic">{errors.feedback}</p>}
                </div>
                <button type="submit" className="w-full bg-[#ffc95e] text-[#2d1b4d] font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Contact;