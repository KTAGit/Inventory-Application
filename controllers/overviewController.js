import { getProductsQuery } from "../model/productQueries.js";
import { productCountQuery, inventoryValueQuery, categoryCountQuery, brandCountQuery } from "../model/overviewQueries.js";


export async function getOverview(req, res){
    try {
        const [
            productCount,
            categoryCount,
            brandCount,
            inventoryValue,
            getProducts
        ] = await Promise.all([
            productCountQuery(),
            categoryCountQuery(),
            brandCountQuery(),
            inventoryValueQuery(),
            getProductsQuery()
        ])

        res.status(200).json({
            productCount,
            categoryCount,
            brandCount,
            inventoryValue,
            getProducts
        })
        
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
    
}

