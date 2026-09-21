import { pool } from "./db.js";

export function createCategoryQuery(categoryName, description){
    return pool.query(`INSERT INTO categories (name, description) 
        VALUES ($1, $2)
        `, [categoryName, description])
}

export function getCategoriesQuery(){
    return pool.query(`SELECT categories.*, COUNT(products.name) FROM categories 
        LEFT JOIN products ON products.category_id = categories.id
        GROUP BY categories.id
        `)
}

export async function getCategoryByIdQuery(id) {
    const result = await pool.query(`SELECT id ,name, description FROM categories WHERE id = ($1)`, [id])
    return result.rows
}

export function updateCategoryQuery(id, categoryName, description){
    return pool.query(`UPDATE categories
        SET name = ($1), description = ($2)
        WHERE id = ($3)
        `, [categoryName, description, id])
}

export function deleteCategoryQuery(id){
    return pool.query(`DELETE FROM categories 
        WHERE id = ($1)
         `, [id])
}

export function removeCategoryFromList(id) {
    return pool.query(`UPDATE categories
        SET isactive = ($1)
        WHERE id = ($2)
        `, [false, id])
}