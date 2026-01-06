import React from 'react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const { cart, total, removeFromCart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                    <span className="text-indigo-600">Shop</span>Demo
                </h1>
                <div className="flex items-center space-x-4">
                    <div className="relative group cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                            <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">Your Cart</h3>
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-sm">Cart is empty</p>
                            ) : (
                                <>
                                    <ul className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                                        {cart.map((item, idx) => (
                                            <li key={`${item.id}-${idx}`} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />
                                                    <div>
                                                        <p className="font-medium text-gray-800">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.selectedVariant}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-gray-500">x{item.quantity}</span>
                                                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeFromCart(item.id);
                                                        }}
                                                        className="text-gray-400 hover:text-red-500 p-1"
                                                        title="Remove"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-between items-center pt-3 border-t">
                                        <span className="font-bold text-gray-800">Total:</span>
                                        <span className="font-bold text-indigo-600 text-lg">${total.toFixed(2)}</span>
                                    </div>
                                    <button className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Checkout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
