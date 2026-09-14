import express from "express"
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoriesController.js"
import { createBrand, getbrands, updateBrand, deleteBrand } from "../controllers/brandsController.js"
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById, deleteConfirmation } from "../controllers/productsController.js"
import { getOverview } from "../controllers/overviewController.js"
import { addProduct } from "../controllers/productsController.js"

const router = express.Router()

// overview route
router.get("/", getOverview)


// product route
router.get("/products", getProducts)

router.get("/products/add-product", addProduct)
router.post("/products/add-product", createProduct)

router.get("/products/:id", getProductById)
router.post("/products/:id", updateProduct)

router.get("/products/delete/:id", deleteConfirmation)
router.post("/products/delete/:id", deleteProduct)


// category route
router.get("/categories", getCategories)

router.post("/categories", createCategory)

router.put("/categories/:id", updateCategory)

router.delete("/categories/:id", deleteCategory)


// brand route
router.get("/brands", getbrands)

router.post("/brands", createBrand)

router.put("/brands/:id", updateBrand)

router.delete("/brands/:id", deleteBrand)







export default router