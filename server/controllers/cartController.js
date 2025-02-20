import { Cart } from "../models/cartModel.js";
import { MenuItem } from "../models/menuModel.js";

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

export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("items.menuItemId");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({ message: "Cart items fetched", data: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { menuItemId,quantity } = req.body;

        // Find the course to ensure it exists and fetch its price
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let AddingItem = await Cart.findOne({userId });

        if (!AddingItem) {
            AddingItem = new Cart({
                userId,
                items: [{restaurantId: menuItem.restaurantId, menuItemId, quantity, price: menuItem.price }]
            });
        }
        else
        {
            const existingItemIndex = AddingItem.items.findIndex(item => item.menuItemId.toString() === menuItemId.toString());

            if (existingItemIndex > -1) {
                return res.status(400).json({ message: "Menu item already in cart" });
            } else {
                AddingItem.items.push({ restaurantId: menuItem.restaurantId, menuItemId, quantity, price: menuItem.price });
            }
        }
        AddingItem.calculateTotalPrice();
        await AddingItem.save();
        res.status(200).json({ data: AddingItem, message: "Menu item added to cart" });
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
        const { menuItemId } = req.params;
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
