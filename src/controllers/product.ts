import express from 'express';

import {
    getProducts as getProductsFromDb,
    createProduct as createProdcutFromDb,
} from '../db/product';

export const getProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProductsFromDb();
        if (products === null) {
            return res.sendStatus(404);
        }
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, price, stock, category } = req.body;
        const product = await createProdcutFromDb({
            name,
            description,
            price,
            stock,
            category,
            createdAt: Math.floor(new Date().getTime() / 1000),
        });
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}