import express from 'express';

import { getUserByEmail, deleteUserById, updateUserById } from '../controllers/user';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/user', isAuthenticated, getUserByEmail);
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUserById);
    router.put('/user/:id', isAuthenticated, isOwner, updateUserById);
};