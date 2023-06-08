import express from 'express';

import {
    getCartByUserId as getCartByUserIdFromDb,
    createCart as createCartFromDb,
    addItemToCart as addItemToCartFromDb,
    removeItemFromCart as removeItemFromCartFromDb,
} from '../db/cart';

export const getCartByUserId = async (req: express.Request, res: express.Response) => {
    try {
        var userId  = req.query.userId;
        if (userId === null) {
            return res.sendStatus(400);
        }
        const cart = await getCartByUserIdFromDb(userId.toString());
        if (cart === null) {
            return res.sendStatus(404);
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createCart = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.body;
        const cart = await createCartFromDb({
            userId,
            createdAt: Math.floor(new Date().getTime() / 1000),
        });
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const addItemToCart = async (req: express.Request, res: express.Response) => {
    try {
        var userId = req.query.userId;
        var item = req.body;
        const cart = await getCartByUserIdFromDb(userId.toString());
        if (cart === null) {
            return res.sendStatus(404);
        }
        const result = await addItemToCartFromDb(cart.userId, item);
        if (result === null) {
            return res.sendStatus(404);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const removeItemFromCart = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.query.userId;
        const itemId = req.query.itemId;
        const cart = await getCartByUserIdFromDb(userId.toString());
        if (cart === null) {
            return res.sendStatus(404);
        }
        var result = await removeItemFromCartFromDb(cart.userId, itemId.toString());
        if (result === null) {
            return res.sendStatus(404);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}