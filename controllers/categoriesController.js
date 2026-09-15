import { createCategoryQuery, getCategoriesQuery, updateCategoryQuery, deleteCategoryQuery, getCategoryByIdQuery } from "../model/categoryQueries.js";


export async function createCategory(req, res) {
    try {
        const {categoryName, description} = req.body

        await createCategoryQuery(categoryName, description)

        res.status(201).redirect("/categories")
    } catch (error) {
        res.status(500).json({
            error: "Failed to create category"
        })
    }
}

export async function getCategories(req, res) {
    try {
        const result = await getCategoriesQuery()

        res.status(200).render("categories", {categories: result.rows})
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve categories"
        })
    }
}

export async function updateCategory(req, res) {
    try {
        const {id} = req.params
        const {name, description} = req.body

        await updateCategoryQuery(id ,name, description)

        res.status(200).redirect("/categories")
    } catch (error) {
        res.status(500).json({
            error: "Failed to update category"
        })
    }
}

export async function deleteCategory(req, res) {
    try {
        const {id} = req.params        
        await deleteCategoryQuery(id)

        res.status(200).redirect("/categories")
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete category"
        })
    }
}

export async function addCategory(req, res) {
    try {
        res.render("add-category")
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export async function getCategoryById(req, res) {
    try {
        const {id} = req.params
        const result = await getCategoryByIdQuery(id)

        res.render("updateCategory", {category: result})
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export async function categoryDeletionConf(req, res) {
    try {
        const {id} = req.params
        const result = await getCategoryByIdQuery(id)
        
        res.render('categoryDeletionConf', {categoryName: result[0].name, categoryId: result[0].id})
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}
