import express from "express";
const router = express.Router();
import { userAuth } from "../middleware/userAuth.js";
import { getCartItems, updateCartItem, removeCartItem, clearCart, getCart,addItemToCart} from "../controllers/cartController.js"; 

// Public Routes
router.get("/get-cart", userAuth, getCart);
router.get("/get-cart-items", userAuth, getCartItems);
router.post("/add-to-cart",userAuth ,addItemToCart);
router.delete("/deleteCart/:menuItemId",userAuth, removeCartItem);
router.delete("/clearCart",userAuth, clearCart);
router.put("/updateCart",userAuth,  updateCartItem);

export  { router as cartRouter };
