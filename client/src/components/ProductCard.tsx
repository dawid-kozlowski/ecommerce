import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, cart } = useCart();
    const [variant, setVariant] = useState('Default');
    const [quantity, setQuantity] = useState(1);

    const itemsInCart = cart
        .filter(item => item.id === product.id)
        .reduce((acc, item) => acc + item.quantity, 0);

    const availableStock = Math.max(0, product.stockQuantity - itemsInCart);

    const handleAddToCart = () => {
        if (availableStock >= quantity && quantity > 0) {
            addToCart(product, variant, quantity);
            setQuantity(1);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {availableStock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold uppercase text-sm tracking-wider">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
                    <span className="text-lg font-semibold text-indigo-600">${product.price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center mb-4 w-full">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{product.category}</p>
                    <span className="text-sm font-medium text-gray-700">Stock: {availableStock}</span>
                </div>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 flex-grow">
                            <label htmlFor={`variant-${product.id}`} className="text-sm text-gray-600 font-medium">Variant:</label>
                            <select
                                id={`variant-${product.id}`}
                                value={variant}
                                onChange={(e) => setVariant(e.target.value)}
                                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 px-2 py-1 w-full"
                                disabled={availableStock === 0}
                            >
                                <option value="Default">Default</option>
                                <option value="Option A">Option A</option>
                                <option value="Option B">Option B</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <label htmlFor={`qty-${product.id}`} className="text-sm text-gray-600 font-medium">Qty:</label>
                            <input
                                type="number"
                                id={`qty-${product.id}`}
                                min="1"
                                max={availableStock}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.min(availableStock, Math.max(1, parseInt(e.target.value) || 1)))}
                                className="w-16 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 px-2 py-1"
                                disabled={availableStock === 0}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={availableStock === 0}
                        className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2
                            ${availableStock > 0
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md hover:shadow-lg'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <span>{availableStock > 0 ? 'Add to Cart' : 'Unavailable'}</span>
                        {availableStock > 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
