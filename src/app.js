import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(cors({
    origin: 'https://grocerymanagementfrontend.onrender.com',
    credentials: true,
    
}))
app.use(express.json());
app.use(express.urlencoded({ extended:true,}))
app.use(express.static("public"))
app.use(cookieParser());
app.use('/api/v1/images',express.static('public/images'))
// routes


import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'









app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);
export default app;