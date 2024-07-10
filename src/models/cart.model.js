import { Schema } from "mongoose";

const cartSchema = new Schema({
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
},{timestamps:true})

export const Cart = mongoose.model("Cart", cartSchema);