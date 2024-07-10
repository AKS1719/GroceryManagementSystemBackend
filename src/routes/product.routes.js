import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";



const router = new Router();


router.route('/getProducts').get(getProducts)

export default router;