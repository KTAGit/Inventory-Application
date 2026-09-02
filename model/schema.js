import { pool } from "./db.js";


export async function createTables(){
    
    await pool.query(
        `CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            description TEXT NOT NULL
        )`
    )

    await pool.query(
        `CREATE TABLE IF NOT EXISTS brands (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        )`
    )

    await pool.query(
        `CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            brand INTEGER REFERENCES brands(id),
            category_id INTEGER REFERENCES categories(id),
            current_stock INTEGER NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            condition TEXT NOT NULL,
            image_url TEXT
        )`
    )
}