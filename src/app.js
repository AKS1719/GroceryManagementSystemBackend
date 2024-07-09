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

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

import userRouter from './routes/user.routes.js'










app.use('/api/v1/users',userRouter);
export default app;