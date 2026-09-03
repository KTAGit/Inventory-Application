import { createProductQuery, getProductsQuery, updateProductQuery, deleteProductQuery } from "../model/productQueries.js";


export async function createProduct(req, res) {
    try {
        const {productName, description, brandId, categoryId, currentStock, price, condition, imgUrl} = req.body
        console.log(productName, description, brandId, categoryId, currentStock, price, condition, imgUrl)
        await createProductQuery(productName, description, brandId, categoryId, currentStock, price, condition, imgUrl)

        res.status(201).json({
            message: "Product created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Failed to create product"
        })
    }
}

export async function getProducts(req, res) {
    try {
        const result = await getProductsQuery()

        res.status(200).json({
            message: "Products retrieved",
            categories: result.rows
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve products"
        })
    }
}

export async function updateProduct(req, res) {
    try {
        const {id} = req.params
        const {productName, description, brandId, categoryId, currentStock, price, condition, imgUrl} = req.body

        await updateProductQuery(id ,productName, description, brandId, categoryId, currentStock, price, condition, imgUrl)

        res.status(200).json({
            message: "Product updated"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to update product"
        })
    }
}

export async function deleteProduct(req, res) {
    try {
        const {id} = req.params

        await deleteProductQuery(id)

        res.status(200).json({
            message: "Product deleted"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete product"
        })
    }
}
