import express from "express";
import dotenv from "dotenv"
import router from "./routes/pageRoute.js"

dotenv.config()
const app = express()



app.use("/", router)









const PORT = process.env.PORT


app.listen(PORT, (err) => {
    if (err) {
        console.log("Error: ", err)
    }
    console.log("Listening on PORT ", PORT)
})