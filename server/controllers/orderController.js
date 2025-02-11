import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import { MenuItem } from "../models/menuModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { restaurantId, items } = req.body;
        const userId = req.user.id;

        // Check if restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }


        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
            }
            totalAmount += menuItem.price * item.quantity;
            orderItems.push({
                menuItemId: menuItem._id,
                quantity: item.quantity,
                price: menuItem.price,
            });
        };

        // Create order
        const newOrder = new Order({
            userId,
            restaurantId,
            items: orderItems,
            totalAmount,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order details by order ID
export const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId).populate("items.menuItemId");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for a restaurant
export const getAllOrders = async (req, res) => {
    try {
        console.log("User Object:", req.user); // Debugging log
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const restaurantId = req.user.id;
        const orders = await Order.find({ restaurantId }).populate("userId").populate("items.menuItemId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
