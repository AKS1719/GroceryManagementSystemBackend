import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended:true,}))
app.use(express.static("public"))
app.use(cookieParser());
// routes

app.use(cors())

import userRouter from './routes/user.routes.js'










app.use('/api/v1/users',userRouter);
export default app;