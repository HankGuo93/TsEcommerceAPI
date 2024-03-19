import express from "express";

import {
  getProductById as getProductByIdFromDb,
  getProducts as getProductsFromDb,
  getProductsByCategory as getProductsByCategoryFromDb,
  createProduct as createProductFromDb,
  updateProductById as updateProductByIdFromDb,
  deleteProductById as deleteProductByIdFromDb,
} from "../db/product";

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product endpoints
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful retrieval of the product
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
export const getProductById = async (
  req: express.Request,
  res: express.Response
) => {
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
};

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successful retrieval of the products
 *       404:
 *         description: Products not found
 */
export const getProducts = async (
  req: express.Request,
  res: express.Response
) => {
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
};

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful retrieval of the products
 *       404:
 *         description: Products not found
 */
export const getProductsByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await getProductsByCategoryFromDb(
      req.query.category.toString()
    );
    if (products === null) {
      return res.sendStatus(404);
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Specify the properties of the product object
 *     responses:
 *       200:
 *         description: Successful creation of the product
 *       400:
 *         description: Invalid request body
 */
export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const product = await createProductFromDb({
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
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               // Specify the properties of the product object
 *     responses:
 *       200:
 *         description: Successful update of the product
 *       400:
 *         description: Invalid ID or request body
 */
export const updateProductById = async (
  req: express.Request,
  res: express.Response
) => {
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
      category,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Successful deletion of the product
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
export const deleteProductById = async (
  req: express.Request,
  res: express.Response
) => {
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
};
