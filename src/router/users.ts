import express from 'express';

import { getUserByEmail } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/user', isAuthenticated, getUserByEmail);
};