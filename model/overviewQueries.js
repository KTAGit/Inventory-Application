import { pool } from "./db.js";


export async function productCountQuery(){
    const result = await pool.query(`SELECT COUNT(*) FROM products`)
    return result.rows[0]
}

export async function inventoryValueQuery(){
    const result = await pool.query(`SELECT SUM(price * current_stock) FROM products`)
    return result.rows[0]
}

export async function categoryCountQuery(){
    const result = await pool.query(`SELECT COUNT(*) FROM categories`)
    return result.rows[0]
}

export async function brandCountQuery(){
    const result = await pool.query(`SELECT COUNT(*) FROM brands`)
    return result.rows[0]
}
