import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useAuthStore from './useAuthStore';

const useProfileStore = create((set) => ({
    profile: null,
    addresses: [],
    isLoading: false,

    fetchProfile: async () => {
        const { user } = useAuthStore.getState();
        if (!user) {
            set({ profile: null, addresses: [] });
            return;
        }

        set({ isLoading: true });

        try {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
               console.error(profileError);
            } else if (profileData) {
               set({ profile: profileData });
            }

            const { data: addrData, error: addrError } = await supabase
                .from('addresses')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (addrError) throw addrError;

            set({ addresses: addrData || [] });

        } catch (err) {
            console.error("Profile Fetch Error", err);
        } finally {
            set({ isLoading: false });
        }
    },

    updateProfileInfo: async (updates) => {
        const { user } = useAuthStore.getState();
        if (!user) return false;

        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            set((state) => ({ profile: { ...state.profile, ...updates } }));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    addAddress: async (addressData) => {
        const { user } = useAuthStore.getState();
        if (!user) return false;

        try {
            const { data, error } = await supabase
                .from('addresses')
                .insert({ user_id: user.id, ...addressData })
                .select()
                .single();
            if (error) throw error;

            set((state) => ({ addresses: [data, ...state.addresses] }));
            return data;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    deleteAddress: async (id) => {
         try {
            const { error } = await supabase
                .from('addresses')
                .delete()
                .eq('id', id);
            if (error) throw error;
            set((state) => ({ addresses: state.addresses.filter(a => a.id !== id) }));
         } catch (err) {
             console.error(err);
         }
    }
}));

export default useProfileStore;
