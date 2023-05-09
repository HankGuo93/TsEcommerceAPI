import express from 'express';

import { createProduct, getProducts, getProductsByCategory, updateProductById } from '../controllers/product';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/product/all', getProducts);
    router.get('/product', getProductsByCategory);
    router.post('/product', isAuthenticated, createProduct);
    router.put('/product/:id', isAuthenticated, updateProductById);
}