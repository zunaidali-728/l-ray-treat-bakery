import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useAuthStore from './useAuthStore';

const useWishlistStore = create((set, get) => ({
    items: [],
    isLoading: false,

    fetchWishlist: async () => {
        const { user } = useAuthStore.getState();
        if (!user) {
            set({ items: [] });
            return;
        }

        set({ isLoading: true });
        
        try {
            // We join the wishlist with products.
            const { data, error } = await supabase
                .from('wishlist')
                .select(`
                    id,
                    product_id,
                    products (*)
                `)
                .eq('user_id', user.id);
            
            if (error) throw error;
            
            // Format to an array of products mapped with wishlist_id
            const formattedItems = (data || []).map(row => ({
                wishlist_id: row.id,
                ...row.products
            }));
            
            set({ items: formattedItems, isLoading: false });
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            set({ isLoading: false });
        }
    },

    toggleWishlist: async (product) => {
        const { user } = useAuthStore.getState();
        if (!user) {
            console.warn("User must be logged in to wishlist.");
            return false;
        }

        const { items } = get();
        const exists = items.find(item => item.id === product.id);

        if (exists) {
            // Remove
            try {
                // Instantly update UI for snappy feel
                set({ items: items.filter(i => i.id !== product.id) });
                
                await supabase
                    .from('wishlist')
                    .delete()
                    .eq('id', exists.wishlist_id);
                    
                return false; 
            } catch (err) {
                console.error("Removal failed", err);
                get().fetchWishlist(); // rollback
            }
        } else {
            // Add
            try {
                // Optimistic UI insert
                const tempId = `temp-${Date.now()}`;
                set({ items: [...items, { ...product, wishlist_id: tempId }] });

                const { data, error } = await supabase
                    .from('wishlist')
                    .insert({ user_id: user.id, product_id: product.id })
                    .select()
                    .single();
                
                if (error) throw error;
                
                // Replace temp UI ID with real DB ID
                set((state) => ({
                    items: state.items.map(i => i.wishlist_id === tempId ? { ...i, wishlist_id: data.id } : i)
                }));
                
                return true;
            } catch (err) {
                console.error("Insertion failed", err);
                get().fetchWishlist(); // rollback
            }
        }
    },
    
    isWishlisted: (productId) => {
        return get().items.some(item => item.id === productId);
    }
}));

export default useWishlistStore;
