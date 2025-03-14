import express from "express";
const router = express.Router();
import { addMenuItem, getMenuItems,  getMenuItemDetails , updateMenuItem, deleteMenuItem, RestaurantMenuItems,toggleMenuItemAvailability,searchMenuItems, getMenuItemById } from "../controllers/menuController.js";
import { restaurantAuth } from "../middleware/restaurantAuth.js";
import { upload } from "../middleware/multer.js";





// Public Routes
router.get("/getMenu",  getMenuItems);
router.get('/MenuDetails/:menuId' ,getMenuItemDetails);
router.post('/searchMenuItems' ,searchMenuItems);

// Admin Routes (Requires restaurant authentication)
router.post("/add-menu",  restaurantAuth, upload.single("image") , addMenuItem);  // Add menu item (Admin)
router.put("/updateMenu/:menuId", restaurantAuth, upload.single("image"), updateMenuItem);
router.delete("/deleteMenu/:menuId",restaurantAuth, deleteMenuItem);  // Delete menu item (Admin)
router.get("/get-restaurant-menu-items",restaurantAuth,RestaurantMenuItems)
router.get("/get-restaurant-menu-item/:menuId",restaurantAuth,getMenuItemById )
router.patch("/toggleAvailability/:menuId",restaurantAuth, toggleMenuItemAvailability);

export  { router as menuRouter };
