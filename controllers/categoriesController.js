import { getCategoryByName, removeCategoryFromList, createCategoryQuery, getCategoriesQuery, updateCategoryQuery, deleteCategoryQuery, getCategoryByIdQuery } from "../model/categoryQueries.js";
import { checkIfCategoryExist } from "./productsController.js";


export async function createCategory(req, res) {
    try {
        const {categoryName, description} = req.body

        const result = await createCategoryQuery(categoryName, description)

        if (result.rows.length > 0) {
            return res.status(201).redirect("/categories")
        }

        const existing = await getCategoryByName(categoryName)
        const category = existing.rows[0]

        if (!category.isactive) {
            await updateCategoryQuery(
                category.id,
                categoryName,
                description ? description : category.description,
                true
            )
            return res.status(201).redirect("/categories")
        }

        return res.status(409).render("error", {
            error: "A category with this name already exists. Please choose a different name."
        })
    
    } catch (error) {
        res.status(500).render("error", {error: "Error creating category."})
    }
}

export async function getCategories(req, res) {
    try {
        const result = await getCategoriesQuery()

        res.status(200).render("categories", {categories: result.rows})
    } catch (error) {
        res.status(500).render("error", {error: "Failed to retrieve categories"})
    }
}

export async function updateCategory(req, res) {
    try {
        const {id} = req.params
        const {name, description} = req.body
        const category = await getCategoryByIdQuery(id)
        await updateCategoryQuery(
            id,
            name ? name : category[0].name,
            description ? description : category[0].description,
            category[0].isactive
        )
        res.status(200).redirect("/categories")
    } catch (error) {
        error.code === "23505" ? 
        res.status(500).render("error", {error: "A category with this name already exists. Please choose a different name."}) :
        res.status(500).render("error", {error: "Failed to update category"})
    }
}

export async function deleteCategory(req, res) {
    try {
        const {id} = req.params      
        const {admin} = req.body
        
        if (admin !== process.env.DANGEROUS_ACTION_PASSWORD) {
            return res.status(401).render("wrongpassword")
        }  
        const isProductReferenceCategory = await checkIfCategoryExist(id)
        isProductReferenceCategory ? await removeCategoryFromList(id) : await deleteCategoryQuery(id)

        res.status(200).redirect("/categories")
    } catch (error) {
        res.status(500).render("error", {error: "Failed to delete category"})
    }
}

export async function addCategory(req, res) {
    try {
        res.render("add-category")
    } catch (error) {
        res.status(500).render("error", {error: "Internal server error"})
    }
}

export async function getCategoryById(req, res) {
    try {
        const {id} = req.params
        const result = await getCategoryByIdQuery(id)

        res.render("updateCategory", {category: result})
    } catch (error) {
        res.status(500).render("error", {error: "Internal server error"})
    }
}

export async function categoryDeletionConf(req, res) {
    try {
        const {id} = req.params
        const result = await getCategoryByIdQuery(id)
        
        res.render('categoryDeletionConf', {categoryName: result[0].name, categoryId: result[0].id})
    } catch (error) {
        res.status(500).render("error", {error: "Internal server error"})
    }
}
