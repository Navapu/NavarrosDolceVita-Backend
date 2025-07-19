import { Order } from "../db/models/index.js"
import { ResponseAPI } from "../utils/response.js"
import { Product } from "../db/models/index.js";

export const createOrder = async (req, res, next) => {
    try {
        const { products, deliveryAddress } = req.body;
        const userId = req.userId;
        let total = 0;
        let notexist = false;
        let notproduct = [];
        // Siguiente linea realizada con IA (Linea 11)
        const detailedProducts = await Promise.all(products.map(async (product) => {
            const existingProduct = await Product.findById(product.id);
            if (!existingProduct) {
                notexist = true;
                notproduct.push(product.id);
                return
            }
            total += existingProduct.price * product.quantity;
            return {
                product: existingProduct._id,
                name: existingProduct.name,
                price: existingProduct.price,
                quantity: product.quantity
            };
        }));
        if (notexist) {
            return res.status(400).json(ResponseAPI({
                msg: `Product: ${notproduct} not found`,
                error: true
            }))
        }
        const order = await Order.create({
            user: userId,
            products: detailedProducts,
            totalPrice: total,
            deliveryAddress
        });
        res.status(201).json(ResponseAPI({
            msg: "Order created",
            data: order,
            error: false
        }))
    } catch (error) {
        next(error)
    }
}