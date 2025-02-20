import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import { MenuItem } from "../models/menuModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.Stripe_Private_Api_Key);

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
export const getOrders= async (req, res) => {
    try {
        const  userId = req.user.id; // Get userId from query params
        //return res.status(200).json({data:userId, message:"kittatha user id"});
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const orders = await Order.find({ userId }).populate("items.menuItemId"); // Fetch only user-specific orders
        return res.status(200).json({data: orders});
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all orders for a restaurant
// export const getAllOrders = async (req, res) => {
//     try {
//         let restaurantId = req.restaurant.id;
//         const orderList = await Order.find({ restaurantId })
//             .populate("restaurantId").populate("userId").populate("sessionId");
//         if (!orderList.length) {
//             return res.status(404).json({ message: "No orders found for this restaurant" });
//         }
//         return res.status(200).json({ data: orderList, message: "All orders fetched" })
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
export const getAllOrders = async (req, res) => {
    try {
        let restaurantId = req.restaurant.id;


        // Find orders for the restaurant
        const orderList = await Order.find({ restaurantId })
        .populate("restaurantId").populate("userId").populate("items.menuItemId");

        if (!orderList.length) {
            return res.status(404).json({ message: "No orders found for this restaurant" });
        }
        //#region productDetailsFromSessionID
        // // Fetch order details from Stripe
        // const ordersWithItems = await Promise.all(orderList.map(async (order) => {
        //     try {
        //         const session = await stripe.checkout.sessions.retrieve(order.sessionId);
        //         const lineItems = await stripe.checkout.sessions.listLineItems(order.sessionId);
        //         return {
        //             ...order._doc,
        //             stripeSession: session,
        //             items: lineItems.data, // Ordered items from Stripe
        //         };
        //     } catch (error) {
        //         console.error("Error fetching Stripe session:", error);
        //         return { ...order._doc, stripeSession: null, items: [] };
        //     }
        // }));
        //#endregion
        return res.status(200).json({ data: orderList, message: "All orders fetched" });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: error.message });
    }
};