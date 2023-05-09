import express from 'express';

import {
    getUserByEmail as getUserByEmailFromDb,
    deleteUserById as deleteUserByIdFromDb,
    updateUserById as updateUserByIdFromDb,
} from '../db/user';

export const getUserByEmail = async (req: express.Request, res: express.Response) => {
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

export const deleteUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserByIdFromDb(id);
        return res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.sendStatus(400);
        }

        const user = await updateUserByIdFromDb(id, {
            name: name,
            updatedAt: Math.floor(new Date().getTime() / 1000)
        });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}