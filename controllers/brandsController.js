import { removeBrandFromList, createBrandQuery, getbrandsQuery, updateBrandQuery, deleteBrandQuery, getBrandByIdQuery } from "../model/brandsQueries.js";
import { checkIfBrandExist } from "./productsController.js";


export async function createBrand(req, res) {
    try {
        const {brandName} = req.body
        
        await createBrandQuery(brandName)

        res.status(201).redirect("/brands")
    } catch (error) {
        res.status(500).json({
            error: "Failed to create brand"
        })
    }
}

export async function getbrands(req, res) {
    try {
        const result = await getbrandsQuery()

        res.status(200).render("brands", {brands: result.rows})
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve brands"
        })
    }
}

export async function updateBrand(req, res) {
    try {
        const {id} = req.params
        const {name} = req.body

        await updateBrandQuery(id ,name)

        res.status(200).redirect("/brands")
    } catch (error) {
        res.status(500).json({
            error: "Failed to update brand"
        })
    }
}

export async function deleteBrand(req, res) {
    try {
        const {id} = req.params
        const isProductReferenceBrand = await checkIfBrandExist(id)
        isProductReferenceBrand ? await removeBrandFromList(id) : await deleteBrandQuery(id)

        res.status(200).redirect("/brands")
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete brand"
        })
    }
}

export async function getUpdateBrand(req, res) {
    try {
        const {id} = req.params
        const brands = await getBrandByIdQuery(id)

        res.render("updateBrand", {brands: brands.rows})
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export async function addBrand(req, res) {
    try {
        res.status(200).render("add-brand")
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export async function brandDeletionConf(req, res) {
    try {
        const {id} = req.params
        const brands = await getBrandByIdQuery(id)

        res.status(200).render("brandDeletionConf", {brands: brands.rows[0]})
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}