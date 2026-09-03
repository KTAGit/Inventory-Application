import { pool } from "./db.js";

export function createBrandQuery(brandName){
    return pool.query(`INSERT INTO brands (name) 
        VALUES ($1)
        `, [brandName])
}

export function getbrandsQuery(){
    return pool.query(`SELECT * FROM brands`)
}

export function updateBrandQuery(id, brandName){
    return pool.query(`UPDATE brands
        SET name = ($1)
        WHERE id = ($2)
        `, [brandName, id])
}

export function deleteBrandQuery(id){
    return pool.query(`DELETE FROM brands 
        WHERE id = ($1)
         `, [id])
}