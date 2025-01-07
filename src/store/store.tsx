import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ReactNode } from 'react';

interface ShoppingCartState {
    itemCount: number;
    items: ShoppingCartItem[];
    totalPrice: number;
    addItem: (item: ShoppingCartItem) => void;
    removeItem: (item: ShoppingCartItem) => void;
}

interface ShoppingCartItem {
    name: string;
    price: number;
    quantity: number;
    icon: ReactNode;
}

const useShoppingCartStore = create<ShoppingCartState>()(
    devtools(
        persist(
            (set) => ({
                itemCount: 0,
                totalPrice: 0,
                items: [],
                addItem: (item) =>
                    set((state) => {
                        const existingItem = state.items.find((i) => i.name === item.name);
                        if (existingItem) {
                            existingItem.quantity += 1;
                            return {
                                items: [...state.items],
                                itemCount: state.itemCount + 1,
                                totalPrice: state.totalPrice + item.price,
                            };
                        } else {
                            return {
                                items: [...state.items, { ...item, quantity: 1 }],
                                itemCount: state.itemCount + 1,
                                totalPrice: state.totalPrice + item.price,
                            };
                        }
                    }),
                removeItem: (item) =>
                    set((state) => {
                        const existingItem = state.items.find((i) => i.name === item.name);
                        if (existingItem) {
                            if (existingItem.quantity > 1) {
                                existingItem.quantity -= 1;
                                return {
                                    items: [...state.items],
                                    itemCount: state.itemCount - 1,
                                    totalPrice: state.totalPrice - item.price,
                                };
                            } else {
                                return {
                                    items: state.items.filter((i) => i.name !== item.name),
                                    itemCount: state.itemCount - 1,
                                    totalPrice: state.totalPrice - item.price,
                                };
                            }
                        }
                        return state;
                    }),
            }),
            {
                name: 'shoppingCart',
            }
        )
    )
);

export { useShoppingCartStore };
