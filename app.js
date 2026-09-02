import express from "express";
import dotenv from "dotenv"
import router from "./routes/pageRoute.js"
import { pool } from "./model/db.js";
import { createTables } from "./model/schema.js";

dotenv.config()
const app = express()



app.use("/", router)







const PORT = process.env.PORT

async function startServer() {
    try {
        await pool.query("SELECT 1")
        console.log("Database connected")
        createTables()
        app.listen(PORT, async () => {
            console.log("Listening on PORT ", PORT)
        })
    } catch (err) {
        console.log("Database faild to connect", err.message)
    }
}

startServer()
