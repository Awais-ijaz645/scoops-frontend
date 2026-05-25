import React, { useState } from 'react';

const Checkout = ({ cartItems, totalAmount }) => {
    const [customerName, setCustomerName] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        // Prepare the data to match your MongoDB Order Model
        const orderData = {
            customerName: customerName,
            items: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1 // Fix: ensure quantity is never undefined
            })),
            totalBill: totalAmount
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok) {
                setOrderStatus("✅ Order placed successfully! Check Admin Panel.");
                setCustomerName(''); // Clear the input
            } else {
                setOrderStatus("❌ Error: " + result.error);
            }
        } catch (error) {
            setOrderStatus("❌ Server connection failed. Is your backend running?");
        }
    };

    return (
        <div className="p-10 bg-[#1a0b2e] min-h-screen text-white pt-32">
            <h1 className="text-4xl font-black text-[#ffc95e] mb-10 italic uppercase tracking-tighter">CHECKOUT</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
                {/* Order Summary */}
                <div className="bg-black/30 backdrop-blur-md p-8 rounded-[3rem] border border-white/10 shadow-2xl">
                    <h2 className="text-xl font-bold mb-6 text-[#ffc95e] uppercase tracking-widest">Your Order</h2>
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-white/5 pb-3">
                                <span className="font-medium">{item.name} x {item.quantity || 1}</span>
                                {/* Fix: Use || 1 to prevent NaN if quantity is missing */}
                                <span className="text-white/70">Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t-2 border-[#ffc95e]/20 flex justify-between items-center">
                        <span className="text-3xl font-black uppercase">Total:</span>
                        <span className="text-4xl font-black text-[#ffc95e]">Rs. {totalAmount}</span>
                    </div>
                </div>

                {/* Form Section */}
                <div className="space-y-6">
                    <form onSubmit={handleConfirmOrder} className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Enter Your Name" 
                            className="w-full bg-white/5 border border-white/20 p-5 rounded-2xl focus:outline-none focus:border-[#ffc95e] text-lg transition-all"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-[#ffc95e] text-[#1a0b2e] font-black p-5 rounded-2xl hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-widest"
                        >
                            CONFIRM ORDER & GENERATE BILL
                        </button>
                    </form>
                    {orderStatus && (
                        <div className={`p-4 rounded-xl font-bold text-center ${orderStatus.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {orderStatus}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;