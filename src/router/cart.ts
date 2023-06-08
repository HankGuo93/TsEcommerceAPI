import express from 'express';

import {
    getCartByUserId,
    createCart,
    addItemToCart,
    removeItemFromCart
} from '../controllers/cart'
import { isAuthenticated } from 'middlewares';

export default (router: express.Router) => {
    router.get('/cart', getCartByUserId);
    router.post('/cart', createCart);
    router.put('/cart', addItemToCart);
    router.delete('/cart', removeItemFromCart);
}