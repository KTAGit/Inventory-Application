import { createProductQuery, getProductsQuery, updateProductQuery, deleteProductQuery, checkIfCategoryExistQuery, checkIfBrandExistQuery } from "../model/productQueries.js";
import { getCategoryByIdQuery } from "../model/categoryQueries.js";
import { getCategoriesQuery } from "../model/categoryQueries.js";
import { getbrandsQuery } from "../model/brandsQueries.js";
import { getProductByIdQuery, searchProductQuery } from "../model/productQueries.js";

export async function createProduct(req, res) {
    try {
        const {productName, description, brandId, categoryId, currentStock, price, condition, imgUrl} = req.body
        await createProductQuery(productName, description, brandId, categoryId, currentStock, price, condition, imgUrl)

        res.status(201).redirect("/products")
    } catch (error) {
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
        res.status(500).render("error", {error: "Failed to retrieve products"})
    }
}

export async function updateProduct(req, res) {
    try {
        const {id} = req.params
        const {productName, description, brandId, categoryId, currentStock, price, condition, imgUrl} = req.body
        const category_id = typeof categoryId === "object" ? Number(categoryId[0]) : categoryId
        const brand_id = typeof brandId === "object" ? Number(brandId[0]) : brandId
        await updateProductQuery(id ,productName, description, brand_id, category_id, currentStock, price, condition, imgUrl)
        res.status(200).redirect("/products")
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A product with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Failed to update product"})
    }
}

export async function deleteProduct(req, res) {
    try {
        const {id} = req.params

        await deleteProductQuery(id)

        res.redirect("/products")
    } catch (error) {
        res.status(500).render("error", {error: "Failed to delete product"})
    }
}

export async function getProductWithCateogry(products) {
    const result = await Promise.all(
        products.rows.map(async (item) => {
        const result = await getCategoryByIdQuery(item.category_id)
        return  {
                    itemId: item.id,
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

export async function addProduct(req, res) {
    try {
        const inputData = await Promise.all([
            {
                categories: await getCategoriesQuery(),
                brands: await getbrandsQuery()
            }
        ])
        res.status(200).render("add-product", 
            {
                categories: inputData[0].categories.rows,
                brands: inputData[0].brands.rows
            }
        )
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A product with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Failed to add product"})
    }

}

export async function getProductById(req, res) {
    try {
        const {id} = req.params
        const product = await getProductByIdQuery(id)
        const {name, description, brand, category_id, current_stock, price, condition, image_url} = product.rows[0]
        const result = {
            id: id, 
            name: name, 
            description: description, 
            brand: brand, 
            category_id: category_id, 
            current_stock: current_stock, 
            price: price, 
            condition: condition, 
            image_url: image_url
        }
        const brands = await getbrandsQuery()
        const categories = await getCategoriesQuery()

        res.status(200).render("updateProduct", {product:result, brands: brands.rows, categories: categories.rows})
    } catch (error) {
        res.status(500).render("error", {error: "Internal server error"})
    }
}

export async function deleteConfirmation(req, res) {
    try {
        const {id} = req.params
        const product = await getProductByIdQuery(id)
        const {name, image_url, category_id} = product.rows[0]
        const category = await getCategoryByIdQuery(category_id)
        const result = {
            id: id,
            name: name,
            image_url: image_url,
            category: category[0]
        }
        res.status(200).render("deleteConfirmation", {product: result})
    } catch (error) {
        res.status(500).render("error", {error: "Internal server error"})
    }
}

export async function searchProduct(req, res) {
    try {
        const {searchTerm} = req.query
        const products = await searchProductQuery(searchTerm)
        const finalResult =  await getProductWithCateogry(products)
        
        res.status(200).render("products", {products: finalResult})
    } catch (error) {
        res.status(500).render("error", {error: "Error searching product"})
    }
}

export async function checkIfCategoryExist(category_id) {
    const result = await checkIfCategoryExistQuery(category_id)
    return result.rows.length === 0 ? false : true
}

export async function checkIfBrandExist(brand_id) {
    const result = await checkIfBrandExistQuery(brand_id)
    return result.rows.length === 0 ? false : true
}