import express from "express"

const router = express.Router()


router.get("/", (req, res) => {
    res.send("THIS IS OVERVIEW")
})

router.get("/products", (req, res) => {
    res.send("THIS IS PRODUCTS")
})

router.get("/categories", (req, res) => {
    res.send("THIS IS CATEGORIES")
})

router.get("/brands", (req, res) => {
    res.send("THIS IS BRANDS")
})










export default router