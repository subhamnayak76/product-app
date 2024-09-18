import express from 'express';
import Product from '../model/product.model.js';
export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.description || !product.imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json({success:true,data:products});
    }
    catch{
        res.status(500).json({message:error.message});
    }
}

export const updateProduct = async (req, res) => {
    const product = req.body;
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.json({ success: true, data: updatedProduct });
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json({ success: true, data: deletedProduct })
}