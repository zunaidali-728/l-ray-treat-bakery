import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    items: [],
    
    // Derived total cost of items in cart
    get cartTotal() {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    addItem: (newItem) => set((state) => {
        const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
        
        if (existingItemIndex >= 0) {
            // Item exists, increment quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += 1;
            return { items: updatedItems };
        } else {
            // New item, add to array with quantity 1
            return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }
    }),

    removeItem: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
    })),

    updateQuantity: (itemId, quantity) => set((state) => {
        if (quantity <= 0) {
            return { items: state.items.filter(item => item.id !== itemId) };
        }
        
        return {
            items: state.items.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            )
        };
    }),

    clearCart: () => set({ items: [] }),
}));

export default useCartStore;
