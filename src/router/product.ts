import express from 'express';

import { createProduct, getProducts } from '../controllers/product';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/product/all', getProducts);
    router.post('/product', isAuthenticated, createProduct);
}