import {create} from 'zustand';

export const useProductStore = create((set) =>({
    products : [],
    setProducts: (products) => set({products}),
    
    createProduct: async (product) => {
        if (!product.name || !product.price || !product.description || !product.imageUrl) {
            return {success: false, message: 'All fields are required' };
        }
        const res = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await res.json();
        set((state) => ({
            products: [...state.products, data.data],
        }));
        return {success: true, message : 'Product added successfully'};

    

    },
    deleteProduct: async (pid) => {
        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message};
        }
        set((state) => ({
            products: state.products.filter((p) => p._id !== pid),
        }));
        return {success: true, message: data.message};
    },
    getProducts : async () => {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        set({products: data.data});
    },
    updateProduct:async (pid, updatedProduct) => {
        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( updatedProduct),
        });
        const data = await res.json();
        if(!data.success){
            return {success: false, message: data.message};
        }
        set((state) => ({
            products: state.products.map((p) => p._id === pid ? data.data : p),
        }));
        return {success: true, message: data.message};
    },

}))