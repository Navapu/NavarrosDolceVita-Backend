import { Product } from "../db/models/index.js";
import { ResponseAPI } from "../utils/response.js"


export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json(ResponseAPI({
            msg: "Products has been obtained",
            data: products
        }))
    } catch (error) {
        next(error)
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const userRole = req.userRole;
        if (userRole !== "admin") {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: admin access required",
                error: true
            }));
        }
        const { name, description, price, category, imageUrl, available } = req.body;

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json(ResponseAPI({
                msg: "A product with this name already exists",
                error: true
            }))
        }

        const product = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            imageUrl,
            available
        })

        return res.status(200).json(ResponseAPI({
            msg: "Added product",
            data: product,
            error: false
        }));
    } catch (error) {
        next(error)
    }
}
export const editProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userRole = req.userRole;
        const { name, description, price, category, imageUrl, available } = req.body;

        if (userRole !== "admin") {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: admin access required",
                error: true
            }));
        }
        const product = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
                imageUrl,
                available
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json(ResponseAPI({
                msg: "Product not found",
                error: true
            }));
        }

        return res.status(200).json(ResponseAPI({
            msg: "Updated product",
            data: product,
            error: false
        }));
    } catch (error) {
        next(error)
    }
}

export const delProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userRole = req.userRole;
        const product = await Product.findByIdAndDelete(id);
        console.log(userRole);
        if (userRole !== "admin") {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: admin access required",
                error: true
            }));
        }

        if (!product) {
            return res.status(404).json(ResponseAPI({
                msg: "Product not found",
                error: true
            }));
        }
        return res.status(200).json(ResponseAPI({
            msg: "Removed product",
            data: product,
            error: false
        }));
    } catch (error) {
        next(error)
    }
}