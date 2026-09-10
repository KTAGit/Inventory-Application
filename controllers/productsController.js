import { createProductQuery, getProductsQuery, updateProductQuery, deleteProductQuery } from "../model/productQueries.js";
import { getCategoryById } from "../model/categoryQueries.js";

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
        const finalResult = await getProductWithCateogry(result)
        res.status(200).render("products", {products: finalResult})
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

export async function getProductWithCateogry(products) {
    const result = await Promise.all(
        products.rows.map(async (item) => {
        const result = await getCategoryById(item.category_id)
        return  {
                    itemName: item.name, 
                    itemPrice: item.price, 
                    itemImg: item.image_url,
                    categoryName: result[0].name,
                    stockCount: item.current_stock
                }

        })
    )
    return result   
}