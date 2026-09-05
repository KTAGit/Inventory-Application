import express from "express";
import dotenv from "dotenv"
import router from "./routes/pageRoute.js"
import { pool } from "./model/db.js";
import { createTables } from "./model/schema.js";
import ejs from "ejs"
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




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
