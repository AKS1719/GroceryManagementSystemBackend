import mongoose from 'mongoose';
import { DbName } from '../constants.js';
const dbConnect = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DbName}`)
        // console.log(process.env.MONGODB_URL)
        console.log("MongoDB connection successful: "+ connection)
    } catch (error) {
        throw new Error("Error dbConnect: " + error.message);
        process.exit(1)
    }
}


export default dbConnect;