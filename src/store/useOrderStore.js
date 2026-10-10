import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useAuthStore from './useAuthStore';

const useOrderStore = create((set, get) => ({
    activeOrder: null,
    isLoading: false,

    fetchActiveOrder: async () => {
        const { user } = useAuthStore.getState();
        if (!user) {
            set({ activeOrder: null });
            return;
        }

        set({ isLoading: true });

        try {
            // Find the most recent order that has not been delivered or cancelled
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .not('status', 'in', '("delivered","cancelled")')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is acceptable zero rows returned
            
            set({ activeOrder: data || null, isLoading: false });
        } catch (error) {
            console.error('Error fetching active order:', error);
            set({ isLoading: false });
        }
    },

    clearActiveOrder: () => set({ activeOrder: null }),
}));

export default useOrderStore;
