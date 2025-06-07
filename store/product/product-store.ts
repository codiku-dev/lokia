import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ZustandStorage } from '@/configs/local-storage';
import { Product } from '@/types/product-type';
import { WithoutFunctions } from '@/types/utils-type';

const storeConfig = {
    name: 'product-store',
    storage: createJSONStorage(() => ZustandStorage),

}
type ProductStore = {
    // State
    selectedProduct: Product | null;
    // Sync Actions
    setSelectedProduct: (product: Product | null) => void;
};

const initialState: WithoutFunctions<ProductStore> = {
    selectedProduct: null,
};

export const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            ...initialState,
            setSelectedProduct: (product) => set({ selectedProduct: product }),
        }),
        storeConfig
    )
);
