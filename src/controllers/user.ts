import express from "express";

import {
  getUserByEmail as getUserByEmailFromDb,
  deleteUserById as deleteUserByIdFromDb,
  updateUserById as updateUserByIdFromDb,
} from "../db/user";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user by email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful retrieval of the user
 *       404:
 *         description: User not found
 */
export const getUserByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUserByEmailFromDb(req.query.email.toString());
    if (user === null) {
      return res.sendStatus(404);
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful deletion of the user
 */
export const deleteUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserByIdFromDb(id);
    return res.status(200).json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: Successful update of the user
 *       400:
 *         description: Invalid ID or request body
 */
export const updateUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await updateUserByIdFromDb(id, {
      name,
      email,
      updatedAt: Math.floor(new Date().getTime() / 1000),
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
