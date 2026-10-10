import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useMenuStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('category');
            
            if (error) throw error;
            
            set({ products: data, loading: false });
        } catch (error) {
            console.error("Failed to fetch menu:", error);
            set({ error: error.message, loading: false });
        }
    }
}));

export default useMenuStore;
