import express from "express";
import dotenv from "dotenv"

dotenv.config()
const app = express()



app.get("/", (req, res) => {
    res.send("HOME PAGE")
})












const PORT = process.env.PORT


app.listen(PORT, (err) => {
    if (err) {
        console.log("Error: ", err)
    }
    console.log("Listening on PORT ", PORT)
})