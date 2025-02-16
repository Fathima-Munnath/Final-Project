import { cloudinaryInstance} from "../config/cloudinaryConfig.js";
import { MenuItem } from "../models/menuModel.js";

export const addMenuItem = async (req, res, next) => {
    try {
        if (!req.restaurant || !req.restaurant.id) {
            return res.status(401).json({ message: "Unauthorized, restaurant not found" });
        }
        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) {
            return res.status(404).json({ message: "All fields are required" });
        };

        let cloudinaryResponse;
        if (req.file) {
            cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
        }
        else {
            return res.status(400).json({ message: "Image is required" });
        }
        const restaurantId = req.restaurant.id;
        const menuItem = new MenuItem({ 
            name, 
            description, 
            price, 
            category, 
            image: cloudinaryResponse.url, 
            restaurantId: restaurantId 
        });
        await menuItem.save()
        return res.json({ data: menuItem, message: "menuItem created" });
    }
    catch (error) {
        return res.status(404).json({ message: error.message || "internal server error" });
    };
};

export const getMenuItems = async (req, res, next) => {
    try {

        const menuList = await MenuItem.find().populate("restaurantId", "name location mobile email");
        return res.json({ data: menuList, message: "menuList fetched" })

    }
    catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export const getMenuItemDetails = async (req, res, next) => {
    try {
        const { menuId } = req.params;

        const menuDetails = await MenuItem.findOne({ _id: menuId }).populate("restaurantId", "-password");
        return res.json({ data: menuDetails, message: " menuDetails  fetched" })

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });

    }

};
import mongoose from "mongoose";

export const updateMenuItem = async (req, res, next) => {
    try {
        const { menuId } = req.params;
        const { name, description, price, category, image, availability, offers } = req.body;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(menuId)) {
            return res.status(400).json({ message: "Invalid menuId format" });
        }

        // Find the menu item
        const menuItem = await MenuItem.findById(menuId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Update only provided fields
        if (name) menuItem.name = name;
        if (description) menuItem.description = description;
        if (price) menuItem.price = price;
        if (category) menuItem.category = category;
        if (image) menuItem.image = image;
        if (availability !== undefined) menuItem.availability = availability;
        if (offers) menuItem.offers = offers;

        // Save the updated menu item
        await menuItem.save();

        return res.status(200).json({ message: "Menu updated successfully", data: menuItem });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};




export const deleteMenuItem = async (req, res, next) => {
    try {
        const { menuId } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(menuId)) {
            return res.status(400).json({ message: "Invalid menuId format" });
        }

        // Check if the menu item exists
        const menuItem = await MenuItem.findById(menuId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Delete the menu item
        await MenuItem.findByIdAndDelete(menuId);

        return res.status(200).json({ message: "Menu item deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};



