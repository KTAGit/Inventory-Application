import { createCategoryQuery, getCategoriesQuery, updateCategoryQuery, deleteCategoryQuery } from "../model/categoryQueries.js";


export async function createCategory(req, res) {
    try {
        const {categoryName, description} = req.body
        
        await createCategoryQuery(categoryName, description)

        res.status(201).json({
            message: "Category created"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to create category"
        })
    }
}

export async function getCategories(req, res) {
    try {
        const result = await getCategoriesQuery()

        res.status(200).json({
            message: "Categories retrieved",
            categories: result.rows
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve categories"
        })
    }
}

export async function updateCategory(req, res) {
    try {
        const {id} = req.params
        const {categoryName, description} = req.body

        await updateCategoryQuery(id ,categoryName, description)

        res.status(200).json({
            message: "Category updated"
        })
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

        res.status(200).json({
            message: "Category deleted"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete category"
        })
    }
}
