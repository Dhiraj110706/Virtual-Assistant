import express from 'express';

const authRouter = express.Router();
import { signUp, logIn, logOut } from '../controllers/auth.controller.js';

authRouter.post('/signup', signUp);

authRouter.get('/logout', logOut); 
authRouter.post('/login', logIn);
export default authRouter;
