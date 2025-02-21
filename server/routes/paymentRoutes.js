import e from "express";
import { userAuth } from "../middleware/userAuth.js";
import Stripe from "stripe";
import { Order } from "../models/orderModel.js";
const router = e.Router();

const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
const client_domain = process.env.CLIENT_DOMAIN;
router.post("/create-checkout-session", userAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { products,addressId } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products found in the request." });
        }
        if (!addressId) {
            return res.status(400).json({ message: "Address ID is required." });
        }


        const totalAmount = products.reduce((sum, product) => sum + (product?.menuItemId?.price || 0), 0) * 100; // in paise
        const restaurantId = products[0]?.menuItemId?.restaurantId; // Assuming all products are from the same restaurant

        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant ID is required." });
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product?.menuItemId?.name,
                    images: [product?.menuItemId?.image],
                    description: product?.menuItemId?.description,
                    metadata: {
                        menuItemId: product?.menuItemId?._id?.toString(),
                        restaurantId: product?.menuItemId?.restaurantId?.toString(),
                    },
                },
                unit_amount: Math.round(product?.menuItemId?.price * 100),
            },
            quantity: product?.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        const newOrder = new Order({ 
            userId, 
            sessionId: session?.id, 
            totalAmount: totalAmount,
            restaurantId: restaurantId,
            addressId,
            items: products.map(product => ({
                menuItemId: product?.menuItemId?._id,  // Store the actual menu item ID
                quantity: product?.quantity || 1,  // Ensure quantity is included
                price: product?.menuItemId?.price || 0, // Store the price per unit
            })),
        });

        await newOrder.save();

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
});


router.get("/session-status", async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        if (!sessionId) {
            return res.status(400).json({ error: "session_id is required" });
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        

        console.log("session=====", session);

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || "internal server error");
    }
});

export { router as paymentRouter };