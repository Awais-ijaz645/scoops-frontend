import React, { useEffect, useState } from 'react';
// Example: change your API_BASE or fetch URL to:
const API_BASE = "https://scoops-backend.vercel.app/api";

const AdminPanel = () => {
    const [messages, setMessages] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');

    // --- CRUD Form States ---
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null); 

    // Message Fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [messageText, setMessageText] = useState('');

    // Order Fields
    const [customerName, setCustomerName] = useState('');
    const [totalBill, setTotalBill] = useState('');
    const [itemsInput, setItemsInput] = useState(''); 

    // 1. READ (Fetch Data)
    const fetchData = async () => {
        try {
            const msgRes = await fetch('http://localhost:5000/api/contact');
            const orderRes = await fetch('http://localhost:5000/api/orders');
            
            const msgData = await msgRes.json();
            const orderData = await orderRes.json();

            setMessages(Array.isArray(msgData) ? msgData : []);
            setOrders(Array.isArray(orderData) ? orderData : []);
        } catch (err) {
            console.error("Failed to load data from server.", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const resetFormFields = () => {
        setFullName('');
        setEmail('');
        setMessageText('');
        setCustomerName('');
        setTotalBill('');
        setItemsInput('');
        setIsAdding(false);
        setEditingItem(null);
    };

    // Helper to format string input "Vanilla, Chocolate" into schema-compliant objects
    const formatOrderItems = (rawInput) => {
        if (!rawInput.trim()) return [];
        return rawInput.split(',').map(item => ({
            name: item.trim(),
            price: 0,       // Satisfies schema requirement safely
            quantity: 1     // Satisfies schema requirement safely
        }));
    };

    // 2. CREATE (Add Records)
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        
        const isMsg = activeTab === 'messages';
        const url = isMsg ? 'http://localhost:5000/api/contact' : 'http://localhost:5000/api/orders';
        
        const payload = isMsg ? {
            fullName,
            email,
            message: messageText
        } : {
            customerName,
            totalBill: Number(totalBill),
            items: formatOrderItems(itemsInput)
        };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert(`${isMsg ? 'Message' : 'Order'} created successfully!`);
                resetFormFields();
                fetchData();
            } else {
                const errData = await res.json();
                alert(`Error creating: ${errData.error || 'Server rejected request'}`);
            }
        } catch (err) {
            console.error("Error creating entry:", err);
        }
    };

    // Populate form inputs when editing an item
    const startEdit = (item) => {
        setEditingItem(item);
        setIsAdding(false);
        if (activeTab === 'messages') {
            setFullName(item.fullName || '');
            setEmail(item.email || '');
            setMessageText(item.message || '');
        } else {
            setCustomerName(item.customerName || '');
            setTotalBill(item.totalBill || '');
            setItemsInput(item.items?.map(i => i.name).join(', ') || '');
        }
    };

    // 3. UPDATE (Edit Records)
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        
        const isMsg = activeTab === 'messages';
        const url = isMsg 
            ? `http://localhost:5000/api/contact/${editingItem._id}` 
            : `http://localhost:5000/api/orders/${editingItem._id}`;

        const payload = isMsg ? {
            fullName,
            email,
            message: messageText
        } : {
            customerName,
            totalBill: Number(totalBill),
            items: formatOrderItems(itemsInput)
        };

        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert(`${isMsg ? 'Message' : 'Order'} updated successfully!`);
                resetFormFields();
                fetchData();
            } else {
                const errData = await res.json();
                alert(`Error updating: ${errData.error || 'Verify server endpoints'}`);
            }
        } catch (err) {
            console.error("Error updating entry:", err);
        }
    };

    // 4. DELETE
    const handleDeleteMessage = async (id) => {
        if (window.confirm("Delete this message forever?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
                if (res.ok) fetchData();
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Delete this order record?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
                if (res.ok) fetchData();
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    return (
        <div className="p-10 bg-[#1a0b2e] min-h-screen text-white pt-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Header controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-[#ffc95e] uppercase tracking-tighter italic">
                            Scoops Admin <span className="text-white">Dashboard</span>
                        </h1>
                        <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Full Database CRUD Manager</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => { setEditingItem(null); setIsAdding(!isAdding); }}
                            className={`px-5 py-3 rounded-xl text-xs font-black transition-all tracking-wider uppercase border ${
                                isAdding 
                                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-white'
                            }`}
                        >
                            {isAdding ? 'Close Entry' : `+ Add New ${activeTab === 'messages' ? 'Message' : 'Order'}`}
                        </button>

                        <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                            <button 
                                onClick={() => { setActiveTab('messages'); resetFormFields(); }}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'messages' ? 'bg-[#ffc95e] text-[#1a0b2e] shadow-lg' : 'text-white/50 hover:text-white'}`}
                            >
                                MESSAGES ({messages.length})
                            </button>
                            <button 
                                onClick={() => { setActiveTab('orders'); resetFormFields(); }}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'orders' ? 'bg-[#ffc95e] text-[#1a0b2e] shadow-lg' : 'text-white/50 hover:text-white'}`}
                            >
                                ORDERS ({orders.length})
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- INPUT FORM --- */}
                {(isAdding || editingItem) && (
                    <div className="mb-8 p-6 bg-black/30 border border-white/10 rounded-[2rem] backdrop-blur-md shadow-xl">
                        <h2 className="text-md font-bold text-[#ffc95e] uppercase tracking-widest mb-4">
                            {isAdding ? `🆕 Create New ${activeTab === 'messages' ? 'Message' : 'Order'}` : `✏️ Update Existing ${activeTab === 'messages' ? 'Message' : 'Order'}`}
                        </h2>
                        
                        <form onSubmit={editingItem ? handleUpdateSubmit : handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            {activeTab === 'messages' ? (
                                <>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-2">Sender Name</label>
                                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-sm focus:border-[#ffc95e] outline-none" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-2">Email Address</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-sm focus:border-[#ffc95e] outline-none" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-2">Message Description</label>
                                        <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Type feedback..." className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-sm focus:border-[#ffc95e] outline-none" required />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-2">Customer Name</label>
                                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Name" className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-sm focus:border-[#ffc95e] outline-none" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-2">Ice Cream Items (Comma Separated)</label>
                                        <input type="text" value={itemsInput} onChange={(e) => setItemsInput(e.target.value)} placeholder="Vanilla Bean, Strawberry Bliss" className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-sm focus:border-[#ffc95e] outline-none" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-white/50 block mb-2">Total Bill Amount (Rs.)</label>
                                        <input type="number" value={totalBill} onChange={(e) => setTotalBill(e.target.value)} placeholder="e.g. 450" className="w-full bg-black/40 p-3 rounded-xl border border-white/10 text-sm focus:border-[#ffc95e] outline-none" required />
                                    </div>
                                </>
                            )}
                            
                            <div className="md:col-span-3 flex justify-end gap-2 mt-2">
                                <button type="button" onClick={resetFormFields} className="bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider">Cancel</button>
                                <button type="submit" className="bg-[#ffc95e] hover:bg-[#ffe09e] text-[#1a0b2e] px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md">
                                    {editingItem ? 'Apply Changes' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* --- DISPLAY TABLES --- */}
                <div className="overflow-hidden bg-black/20 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                    {activeTab === 'messages' ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#ffc95e] text-[10px] uppercase tracking-[0.2em] border-b border-white/10 bg-white/5">
                                    <th className="p-6">Name</th>
                                    <th className="p-6">Email</th>
                                    <th className="p-6">Message</th>
                                    <th className="p-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {messages.map((msg) => (
                                    <tr key={msg._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6 font-bold text-white">{msg.fullName}</td>
                                        <td className="p-6 text-white/60 font-medium">{msg.email}</td>
                                        <td className="p-6 text-white/50 italic text-sm">"{msg.message}"</td>
                                        <td className="p-6 text-center flex items-center justify-center gap-2">
                                            <button onClick={() => startEdit(msg)} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">Edit</button>
                                            <button onClick={() => handleDeleteMessage(msg._id)} className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && (
                                    <tr><td colSpan="4" className="p-20 text-center text-white/20 font-bold uppercase tracking-widest">No Messages Found</td></tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#ffc95e] text-[10px] uppercase tracking-[0.2em] border-b border-white/10 bg-white/5">
                                    <th className="p-6">Customer</th>
                                    <th className="p-6">Items Ordered</th>
                                    <th className="p-6">Total Bill</th>
                                    <th className="p-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6 font-black text-white uppercase tracking-tighter">{order.customerName}</td>
                                        <td className="p-6 text-white/60 text-sm">
                                            {order.items && order.items.length > 0 ? order.items.map(i => i.name).join(', ') : "No Items Specified"}
                                        </td>
                                        <td className="p-6">
                                            <span className="bg-green-500/10 text-green-400 px-4 py-1.5 rounded-lg font-black text-sm">Rs. {order.totalBill}</span>
                                        </td>
                                        <td className="p-6 text-center flex items-center justify-center gap-2">
                                            <button onClick={() => startEdit(order)} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">Edit</button>
                                            <button onClick={() => handleDeleteOrder(order._id)} className="bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan="4" className="p-20 text-center text-white/20 font-bold uppercase tracking-widest">No Orders Found</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;