import { pool } from "./db.js";


export function productCountQuery(){
    return pool.query(`SELECT COUNT(*) FROM products`)
}

export function inventoryValueQuery(){
    return pool.query(`SELECT SUM(price * current_stock) FROM products`)
}

export function categoryCountQuery(){
    return pool.query(`SELECT COUNT(*) FROM categories`)
}

export function brandCountQuery(){
    return pool.query(`SELECT COUNT(*) FROM brands`)
}
