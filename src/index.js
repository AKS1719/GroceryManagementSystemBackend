import dotenv from 'dotenv'
import app from './app.js'
import dbConnect  from  './db/db1.js'
dotenv.config({
    path: './.env',
})

dbConnect()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`app running in http://localhost:${process.env.PORT}`)
    })
    app.on("error", (err) => {
        console.log(err);
        throw err;
    })
})
.catch((errr) => {
    console.log("Mongo Db connection failed !!", errr)
})