import React, { useState } from 'react';
import ProductCard from './ProductCard';
import AddProductForm from './AddProductForm';
import CategoryFilter from './CategoryFilter';
import { useProducts } from '../hooks/useProducts';

const ProductListing: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [showAddForm, setShowAddForm] = useState(false);
    const { products, loading, error, refetch } = useProducts(category);

    const handleProductAdded = () => {
        setShowAddForm(false);
        refetch(category);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>

                <div className="flex items-center space-x-4 w-full md:w-auto">
                    <CategoryFilter
                        categories={['', 'Electronics', 'Apparel', 'Accessories']}
                        selectedCategory={category}
                        onSelectCategory={setCategory}
                    />
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-md flex items-center shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Product
                    </button>
                </div>
            </div>

            {showAddForm && (
                <AddProductForm
                    onProductAdded={handleProductAdded}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="bg-white h-96 rounded-xl animate-pulse shadow"></div>
                    ))}
                </div>
            ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                    <p className="text-red-700">{error}</p>
                    <button onClick={() => refetch(category)} className="mt-2 text-red-600 underline text-sm font-bold">Try Again</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default ProductListing;
