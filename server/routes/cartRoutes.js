import express from "express";
const router = express.Router();
import { userAuth } from "../middleware/userAuth.js";
import { getCartItems, updateCartItem, removeCartItem, clearCart, getCart,addItemToCart} from "../controllers/cartController.js"; 

// Public Routes
router.get("/getCart", userAuth, getCart);
router.get("/getCartItems", userAuth, getCartItems);
router.post("/addCart",userAuth ,addItemToCart);
router.delete("/deleteCart/:menuItemId",userAuth, removeCartItem);
router.delete("/clearCart",userAuth, clearCart);
router.put("/updateCart",userAuth,  updateCartItem);

export  { router as cartRouter };
