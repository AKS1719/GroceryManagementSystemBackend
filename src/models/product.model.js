import { Schema } from "mongoose";

const productSchema = new Schema (
    {
        cart:{
            type:Schema.Types.ObjectId,
            ref:'Cart',
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
        },
        productDescription:{
            type:String,
            required:true,
        }
    },{timestamps:true}
)

export const Product = mongoose.model('Product',productSchema);