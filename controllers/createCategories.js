import { insertNewCategories } from "../model/queries.js";


export async function createCategories(req, res) {
    try {
        const {categoryName} = req.body

        await insertNewCategories(categoryName, description)

        res.status(201).json({
            message: "Category created"
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to create category"
        })
    }
}
