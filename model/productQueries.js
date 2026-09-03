import { pool } from "./db.js";

export function createProductQuery(productName, description, brandId, categoryId, currentStock, price, condition, imgUrl){
    return pool.query(`
        INSERT INTO products (name, description, brand, category_id, current_stock, price, condition, image_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [productName, description, brandId, categoryId, currentStock, price, condition, imgUrl])
}

export function getProductsQuery(){
    return pool.query(`SELECT * FROM products`)
}

export function updateProductQuery(id, productName, description, brandId, categoryId, currentStock, price, condition, imgUrl){
    return pool.query(`UPDATE products
        SET name = $2, 
        description = $3, 
        brand = $4, 
        category_id = $5, 
        current_stock = $6, 
        price = $7, 
        condition = $8, 
        image_url = $9
        WHERE id = $1
        `, [id, productName, description, brandId, categoryId, currentStock, price, condition, imgUrl])
}

export function deleteProductQuery(id){
    return pool.query(`DELETE FROM products 
        WHERE id = ($1)
         `, [id])
}