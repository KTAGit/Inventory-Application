import { createBrandQuery, getbrandsQuery, updateBrandQuery, deleteBrandQuery } from "../model/brandsQueries.js";


export async function createBrand(req, res) {
    try {
        const {brandName} = req.body
        
        await createBrandQuery(brandName)

        res.status(201).json({
            message: "Brand created"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to create brand"
        })
    }
}

export async function getbrands(req, res) {
    try {
        const result = await getbrandsQuery()

        res.status(200).json({
            message: "Brands retrieved",
            brands: result.rows
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve brands"
        })
    }
}

export async function updateBrand(req, res) {
    try {
        const {id} = req.params
        const {brandName} = req.body

        await updateBrandQuery(id ,brandName)

        res.status(200).json({
            message: "Brand updated"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to update brand"
        })
    }
}

export async function deleteBrand(req, res) {
    try {
        const {id} = req.params

        await deleteBrandQuery(id)

        res.status(200).json({
            message: "Brand deleted"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete brand"
        })
    }
}
