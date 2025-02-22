import express from "express";
const router = express.Router();
import { createOrder, getOrders, getAllOrders, updateOrder  } from "../controllers/orderController.js"; 
import{userAuth}from "../middleware/userAuth.js";
import { restaurantAuth }from "../middleware/restaurantAuth.js";

// User Routes
router.post("/placeOrder", userAuth, createOrder); // Changed path to "/"
router.get("/get-orders", userAuth, getOrders);

// Restaurant Routes (Requires authentication)
router.get("/get-all-orders", restaurantAuth, getAllOrders); // Changed "/orders" to "/"
router.patch("/update-status/:orderId",restaurantAuth,updateOrder )

// Export router
export { router as orderRouter } ;  
