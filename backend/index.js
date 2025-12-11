import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import geminiResponse from './gemini.js';
dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
}));
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


// app.get('/',async (req,res)=>{
//   let prompt = req.query.prompt 

//   let data = await geminiResponse(prompt)
//   res.json(data)
// })

app.listen(port, () => {
    connectDb();
  console.log(`Server is running on port ${port}`);
});
