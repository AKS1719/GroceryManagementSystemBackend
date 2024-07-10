import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Product} from "../models/product.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";


const getProducts = asyncHandler(async (req,res)=>{
    return res.json([
        {
            "id":1,
            "image":"/api/v1/images/loteChocopie.jpeg",
            "description":"A sweet snack",
            "name":"Lotte ChocoPie",
            "price":"100"
        },
        {
            "id":2,
            "image":"/api/v1/images/flour.jpeg",
            "description":"Flour to make your chappaties round",
            "name":"Ashirwad Chakki Atta",
            "price":"300"
        },
        {
            "id":3,
            "image":"/api/v1/images/kaju.jpeg",
            "description":"Dry Fruits to keep you groove",
            "name":"Kalvai Cashews",
            "price":"382"
        },
        {
            "id":4,
            "image":"/api/v1/images/nachos.jpeg",
            "description":"Flavour and health both",
            "name":"Nachos",
            "price":"42"
        }
    ])

})


export {
    getProducts,
}