import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import Cart from '../models/cart.model.js'


const getCart = asyncHandler(async(req,res)=>{
    const cart = Cart.findOne({quantity: {$gte:1}})
    if(!cart){
        throw new ApiError(404, "Cart not found")
    }
    return res.json(new ApiResponse(200,cart,"sf"))
})

export {
    getCart,
 
}