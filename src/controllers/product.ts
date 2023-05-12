import express from 'express';

import {
    getProductById as getProductByIdFromDb,
    getProducts as getProductsFromDb,
    getProductsByCategory as getProductsByCategoryFromDb,
    createProduct as createProdcutFromDb,
    updateProductById as updateProductByIdFromDb,
    deleteProductById as deleteProductByIdFromDb,
} from '../db/product';

export const getProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (id === null) {
            return res.sendStatus(400);
        }
        const product = await getProductByIdFromDb(id);
        if (product === null) {
            return res.sendStatus(404);
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

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

export const getProductsByCategory = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProductsByCategoryFromDb(req.query.category.toString());
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

export const updateProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (id === null) {
            return res.sendStatus(400);
        }
        const { name, description, price, category } = req.body;
        const product = await updateProductByIdFromDb(id, {
            name,
            description,
            price,
            category
        });
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (id === null) {
            return res.sendStatus(400);
        }
        const removed = await deleteProductByIdFromDb(id);
        if (removed === null) {
            return res.sendStatus(404);
        }
        return res.status(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}