import { Cart } from "../models/cartModel.js";
import { MenuItem } from "../models/menuModel.js";

// ✅ Get Cart for User
export const getCart = async (req, res) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("items.menuItemId");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.json({ message: "Cart details fetched", data: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// ✅ Get Cart Items
export const getCartItems = async (req, res) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("items.menuItemId");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.json({ message: "Cart items fetched", data: cart.items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


// ✅ Add Menu Item to Cart (Increases quantity if exists)
export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { restaurantId, menuItemId, quantity } = req.body;

        // Check if the menu item exists
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                userId,
                restaurantId,
                items: [{ menuItemId, quantity, price: menuItem.price }]
            });
        } else {
            // Check if the menu item already exists in the cart
            const existingItem = cart.items.find(item => item.menuItemId.equals(menuItemId));

            if (existingItem) {
                // If item exists, increase the quantity
                existingItem.quantity += quantity;
            } else {
                // If item doesn't exist, add it to the cart
                cart.items.push({ menuItemId, quantity, price: menuItem.price });
            }
        }

        // Recalculate total price
        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: "Item added to cart", data: cart });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Update Cart Item Quantity
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { menuItemId, quantity } = req.body;

        if (!menuItemId || quantity < 1) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.menuItemId.equals(menuItemId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: "Cart item updated", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Remove Item from Cart
export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { menuItemId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => !item.menuItemId.equals(menuItemId));

        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// ✅ Clear Entire Cart
export const clearCart = async (req, res) => {
    try {
        const { user } = req;

        const cart = await Cart.findOneAndDelete({ userId: user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
