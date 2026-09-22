import { pool } from "./db.js";

export function createBrandQuery(brandName){
    return pool.query(`INSERT INTO brands (name) 
        VALUES ($1)
        ON CONFLICT (name)
        DO NOTHING
        RETURNING *
        `, [brandName])
}

export function getbrandsQuery(){
    return pool.query(`SELECT brands.*, COUNT(products.name) FROM brands
        LEFT JOIN products ON products.brand = brands.id
        GROUP BY brands.id
        `)
}

export function updateBrandQuery(id, brandName, status){
    return pool.query(`UPDATE brands
        SET name = ($1), isactive = ($2)
        WHERE id = ($3)
        `, [brandName, status, id])
}

export function deleteBrandQuery(id){
    return pool.query(`DELETE FROM brands 
        WHERE id = ($1)
         `, [id])
}

export function getBrandByIdQuery(id) {
    return pool.query(`SELECT * FROM brands 
        WHERE id = ($1)`,[id])
}

export function removeBrandFromList(id) {
    return pool.query(`UPDATE brands
        SET isactive = ($1)
        WHERE id = ($2)
        `, [false, id])
}

export function getBrandByName(brandName) {
    return pool.query(`SELECT * FROM brands
        WHERE name = $1
        `, [brandName])
}