import express from 'express';
const userRouter = express.Router();
import { askToAssistant, getCurrentUser } from '../controllers/user.controller.js';
import { updateAssistant } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';
import  isAuth  from '../middlewares/isAuth.js';

userRouter.get('/current', isAuth,getCurrentUser);
userRouter.post('/update-assistant', isAuth,upload.single("assistantImage"), updateAssistant);
userRouter.post('/ask-assistant',isAuth,askToAssistant)
export default userRouter; 

