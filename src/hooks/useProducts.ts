import { useState, useEffect, useCallback } from 'react';
import { AgriProduct } from '../types/agri';
import { productService, ProductQueryParams } from '../services/product.service';
import { useDebounce } from './useDebounce';

export function useProducts(initialParams?: ProductQueryParams) {
  const [products, setProducts] = useState<AgriProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>(initialParams?.category || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(initialParams?.searchQuery || '');
  const debouncedSearch = useDebounce(searchQuery, 250);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts({
        category,
        searchQuery: debouncedSearch
      });
      setProducts(data);
    } catch (err) {
      console.warn('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    reload: fetchProducts
  };
}
