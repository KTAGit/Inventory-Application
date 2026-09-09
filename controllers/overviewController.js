import { getProductsQuery } from "../model/productQueries.js";
import { getCategoryById } from "../model/categoryQueries.js";
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
        const products = await Promise.all(
                getProducts.rows.map(async (item) => {
                    const result = await getCategoryById(item.category_id)
                    return  {
                                itemName: item.name, 
                                itemPrice: item.price, 
                                itemImg: item.image_url,
                                categoryName: result[0].name,
                                stockCount: item.current_stock
                            }

            })
        )
        

        const overviewData = {
            productCount,
            categoryCount,
            brandCount,
            inventoryValue,
            getProducts
        }

        res.status(200).render("overview", {items: products.slice(0, 3), overviewData: overviewData})
        
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
    
}

