import { create } from 'zustand';

const useAppStore = create((set, get) => ({
    isDarkMode: localStorage.getItem('theme') === 'dark',
    language: localStorage.getItem('language') || 'English',

    toggleDarkMode: () => {
        const current = get().isDarkMode;
        const nextTheme = !current ? 'dark' : 'light';
        localStorage.setItem('theme', nextTheme);
        
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        set({ isDarkMode: !current });
    },

    setLanguage: (lang) => {
        localStorage.setItem('language', lang);
        set({ language: lang });
    },

    initTheme: () => {
        if (get().isDarkMode || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            set({ isDarkMode: true });
        } else {
            document.documentElement.classList.remove('dark');
            set({ isDarkMode: false });
        }
    }
}));

export default useAppStore;
