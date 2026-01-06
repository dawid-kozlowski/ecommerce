import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { API_BASE_URL } from '../api/config';

export const useProducts = (initialCategory: string = '') => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async (category: string, signal?: AbortSignal) => {
        setLoading(true);
        setError(null);
        try {
            const url = category
                ? `${API_BASE_URL}/products?category=${category}`
                : `${API_BASE_URL}/products`;

            const response = await fetch(url, { signal });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to fetch data');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            if (err.name === 'AbortError') return;
            setError(err.message || 'Error fetching products. Ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchProducts(initialCategory, controller.signal);

        return () => controller.abort();
    }, [fetchProducts, initialCategory]);

    return { products, loading, error, refetch: (cat: string) => fetchProducts(cat) };
};
