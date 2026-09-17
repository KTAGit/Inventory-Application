import express from "express"
import { createCategory, getCategories, updateCategory, deleteCategory, addCategory, getCategoryById, categoryDeletionConf } from "../controllers/categoriesController.js"
import { createBrand, getbrands, updateBrand, deleteBrand, addBrand, getUpdateBrand, brandDeletionConf } from "../controllers/brandsController.js"
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById, deleteConfirmation, searchProduct } from "../controllers/productsController.js"
import { getOverview } from "../controllers/overviewController.js"
import { addProduct } from "../controllers/productsController.js"

const router = express.Router()

// overview route
router.get("/", getOverview)


// product route
router.get("/products", getProducts)

router.get("/products/add-product", addProduct)
router.post("/products/add-product", createProduct)

router.get("/search", searchProduct)
router.get("/products/:id", getProductById)
router.post("/products/:id", updateProduct)

router.get("/products/delete/:id", deleteConfirmation)
router.post("/products/delete/:id", deleteProduct)


// category route
router.get("/categories", getCategories)

router.get("/categories/add-category", addCategory)
router.post("/categories/create-category", createCategory)

router.get("/categories/:id", getCategoryById)
router.post("/categories/:id", updateCategory)

router.get("/categories/delete/:id", categoryDeletionConf)
router.post("/categories/delete/:id", deleteCategory)


// brand route
router.get("/brands", getbrands)

router.get("/brands/add-brand", addBrand)
router.post("/brands/create-brand", createBrand)

router.get("/brands/:id", getUpdateBrand)
router.post("/brands/:id", updateBrand)

router.get("/brands/delete/:id", brandDeletionConf)
router.post("/brands/delete/:id", deleteBrand)


export default router