import express from "express";
const router = express.Router();
import { createOrder, getOrderDetails, getAllOrders } from "../controllers/orderController.js"; 
import{userAuth}from "../middleware/userAuth.js";
import { restaurantAuth }from "../middleware/restaurantAuth.js";

// User Routes
router.post("/placeOrder", userAuth, createOrder); // Changed path to "/"
router.get("/getOrder/:orderId", userAuth, getOrderDetails);

// Restaurant Routes (Requires authentication)
router.get("/get-all-orders", restaurantAuth, getAllOrders); // Changed "/orders" to "/"

// Export router
export { router as orderRouter } ;  
