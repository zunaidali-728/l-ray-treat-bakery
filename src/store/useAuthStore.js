import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    initializeAuth: () => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            set({ 
                user: session?.user ?? null, 
                isAuthenticated: !!session?.user,
                loading: false
            });
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            set({ 
                user: session?.user ?? null, 
                isAuthenticated: !!session?.user
            });
        });
    },

    signUp: async (email, password, metadata) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });
        if (error) throw error;
        return data;
    },

    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        set({ user: null, session: null });
    },

    sendPasswordReset: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
    },

    verifyOtpCode: async (email, token, type) => {
        const { data, error } = await supabase.auth.verifyOtp({ email, token, type });
        if (error) throw error;
        if (data?.session) {
            set({ user: data.session.user, session: data.session });
        }
        return data;
    },

    updatePassword: async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return data;
    }
}));

export default useAuthStore;
