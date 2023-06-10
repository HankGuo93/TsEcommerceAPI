import express from 'express';

import {
    getCartByUserId as getCartByUserIdFromDb,
    createCart as createCartFromDb,
    addItemToCart as addItemToCartFromDb,
    removeItemFromCart as removeItemFromCartFromDb,
} from '../db/cart';

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart endpoints
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful retrieval of the cart
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: Cart not found
 */
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

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful creation of the cart
 *       400:
 *         description: Invalid request body
 */
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

/**
 * @swagger
 * /cart/add-item:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Specify the properties of the item object
 *     responses:
 *       200:
 *         description: Successful addition of the item to the cart
 *       400:
 *         description: Invalid request body or user ID
 *       404:
 *         description: Cart not found
 */
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

/**
 * @swagger
 * /cart/remove-item:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful removal of the item from the cart
 *       400:
 *         description: Invalid user ID or item ID
 *       404:
 *         description: Cart not found or item not found
 */
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