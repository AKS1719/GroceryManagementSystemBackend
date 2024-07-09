import { Schema } from "mongoose";

const cartSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
},{timestamps:true})

export const Cart = mongoose.model("Cart", cartSchema);