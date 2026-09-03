import { pool } from "./db.js";

export function createCategoryQuery(categoryName, description){
    return pool.query(`INSERT INTO categories (name, description) 
        VALUES ($1, $2)
        `, [categoryName, description])
}

export function getCategoriesQuery(){
    return pool.query(`SELECT * FROM categories`)
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