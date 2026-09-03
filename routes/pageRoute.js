import express from "express"
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoriesController.js"

const router = express.Router()

// overview route
router.get("/", (req, res) => {
    res.send("THIS IS OVERVIEW")
})


// product route
router.get("/products", (req, res) => {
    res.send("THIS IS PRODUCTS")
})


// category route
router.get("/categories", getCategories)

router.post("/categories", createCategory)

router.put("/categories/:id", updateCategory)

router.delete("/categories/:id", deleteCategory)


// brands route
router.get("/brands", (req, res) => {
    res.send("THIS IS BRANDS")
})






export default router