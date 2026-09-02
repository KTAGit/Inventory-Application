import { pool } from "./db.js";

export function insertNewCategories(categoryName, description){
    return pool.query(`INSERT INTO categories (name, description) 
        VALUES ($1, $2)
        `, [categoryName, description])
}
