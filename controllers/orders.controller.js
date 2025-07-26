import { Order, Product, User } from "../db/models/index.js"
import { ResponseAPI } from "../utils/response.js"
export const createOrder = async (req, res, next) => {
    try {
        const { products, deliveryAddress, selectedPayment } = req.body;
        const userId = req.userId;
        let total = 0;
        let notexist = false;
        let notproduct = [];
        const currentUser = await User.findById(userId).select('-password');

        if (!currentUser) {
            return res.status(401).json(ResponseAPI({
                msg: "User not found",
                error: true
            }));
        }
        // Siguiente linea realizada con IA (Linea 21)
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
                imageUrl: existingProduct.imageUrl,
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
            deliveryAddress,
            selectedPayment
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

export const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const currentUser = await User.findById(userId).select('-password');
        const existingOrder = await Order.findById(id);
        if (!currentUser) {
            return res.status(401).json(ResponseAPI({
                msg: "User not found",
                error: true
            }));
        }
        if (!existingOrder) {
            return res.status(401).json(ResponseAPI({
                msg: "Order not found",
                error: true
            }));
        }

        if (currentUser._id.toString() !== existingOrder.user.toString()) {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: You are not authorized to view this order",
                error: true
            }));
        }

        return res.status(200).json(ResponseAPI({
            msg: `Order ${existingOrder._id}: `,
            data: existingOrder,
            error: false
        }));

    } catch (error) {
        next(error)
    }
}

export const getUserAllOrders = async (req, res, next) => {
    try {
        const userId = req.userId;
        const currentUser = await User.findById(userId).select('-password');
        if (!currentUser) {
            return res.status(401).json(ResponseAPI({
                msg: "User not found",
                error: true
            }));
        }
        const allOrders = await Order.find({ user: currentUser._id })

        if (!allOrders) {
            return res.status(404).json(ResponseAPI({
                msg: "No orders found for this user",
                error: true,
            }));
        }
        return res.status(200).json(ResponseAPI({
            msg: `${currentUser.name} orders: `,
            data: allOrders,
            error: false
        }));
    } catch (error) {
        next(error)
    }
}

export const getAllOrders = async (req, res, next) => {
    try {
        const userRole = req.userRole;

        if (userRole !== "admin") {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: admin access required",
                error: true
            }));
        }
        const orders = await Order.find().populate("user");

        if (orders.length === 0) {
            return res.status(404).json(ResponseAPI({
                msg: "There are no orders",
                error: true
            }));
        }
        return res.status(200).json(ResponseAPI({
            msg: "All the orders",
            data: orders,
            error: false
        }))

    } catch (error) {
        next(error)
    }
}

export const getPendingOrders = async (req, res, next) => {
    try {
        const userRole = req.userRole;

        if (userRole !== "admin") {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: admin access required",
                error: true
            }));
        }

        const orders = await Order.find({ status: "pending" });

        if (orders.length === 0) {
            return res.status(404).json(ResponseAPI({
                msg: "There are no pending orders",
                error: true
            }));
        }
        return res.status(200).json(ResponseAPI({
            msg: "Pending orders",
            data: orders,
            error: false
        }))
    } catch (error) {
        next(error)
    }
}

export const statusOrders = async (req, res, next) => {
    try {
        const userRole = req.userRole;
        const { id } = req.params;
        const { status } = req.body;
        if (userRole !== "admin") {
            return res.status(403).json(ResponseAPI({
                msg: "Forbidden: admin access required",
                error: true
            }));
        }

        const existingOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!existingOrder) {
            return res.status(401).json(ResponseAPI({
                msg: "Order not found",
                error: true
            }));
        }

        return res.status(200).json(ResponseAPI({
            msg: `Updated order to ${status}`,
            data: existingOrder,
            error: false
        }));

    } catch (error) {
        next(error)
    }
}