import { removeBrandFromList, getBrandByName, createBrandQuery, getbrandsQuery, updateBrandQuery, deleteBrandQuery, getBrandByIdQuery } from "../model/brandsQueries.js";
import { checkIfBrandExist } from "./productsController.js";


export async function createBrand(req, res) {
    try {
        const {brandName} = req.body
        const result = await createBrandQuery(brandName)
        
            if (result.rows.length > 0) {
                return res.status(201).redirect("/brands")
            }
        
            const existing = await getBrandByName(brandName)
            const brand = existing.rows[0]
        
            if (!brand.isactive) {
                await updateBrandQuery(
                    brand.id,
                    brandName,
                    true
                )
                return res.status(201).redirect("/brands")
            }
        
            return res.status(409).render("error", {
                error: "A brand with this name already exists. Please choose a different name."
            })
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A brand with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Failed to create brand"})
    }
}

export async function getbrands(req, res) {
    try {
        const result = await getbrandsQuery()

        res.status(200).render("brands", {brands: result.rows})
    } catch (error) {
        res.status(500).render("error", {error: "Failed to retrieve brands"})
    }
}

export async function updateBrand(req, res) {
    try {
        const {id} = req.params
        const {name} = req.body
        const brand = await getBrandByIdQuery(id)

        await updateBrandQuery(
            id,
            name ? name : brand.rows[0].name,
            brand.rows[0].isactive
        )

        res.status(200).redirect("/brands")
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A brand with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Internal server error"})
    }
}

export async function deleteBrand(req, res) {
    try {
        const {id} = req.params
        const {admin} = req.body

        if (admin !== process.env.DANGEROUS_ACTION_PASSWORD) {
            return res.status(401).render("wrongpassword")
        }
        const isProductReferenceBrand = await checkIfBrandExist(id)
        isProductReferenceBrand ? await removeBrandFromList(id) : await deleteBrandQuery(id)

        res.status(200).redirect("/brands")
    } catch (error) {
        res.status(500).render("error", {error: "Failed to delete brand"})
    }
}

export async function getUpdateBrand(req, res) {
    try {
        const {id} = req.params
        const brands = await getBrandByIdQuery(id)

        res.render("updateBrand", {brands: brands.rows})
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A brand with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Internal server error"})
    }
}

export async function addBrand(req, res) {
    try {
        res.status(200).render("add-brand")
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A brand with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Failed to create brand"})
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