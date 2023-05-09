import express from 'express';

import { getUserByEmail as getUserByEmailFromDb } from '../db/users';

export const getUserByEmail = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserByEmailFromDb(req.query.email.toString());
        if (user === null) {
            return res.sendStatus(404);
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};