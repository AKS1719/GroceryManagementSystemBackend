import { Schema } from "mongoose";
import mongoose from "mongoose";
const productSchema = new Schema (
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
        },
        productName:{
            type:String,
            required:true,
        },
        productPrice:{
            type:Number,
            required:true,
        },
        productQuantity:{
            type:Number,
            required:true,
            default:1,
        },
        productDescription:{
            type:String,
            required:true,
        },
        productImage:{
            type:String,
            required:true,
        }
    },{timestamps:true}
)

export const Product = mongoose.model('Product',productSchema);