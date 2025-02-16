import express from "express";
const router = express.Router();
import { addMenuItem, getMenuItems,  getMenuItemDetails , updateMenuItem, deleteMenuItem} from "../controllers/menuController.js";
import { restaurantAuth } from "../middleware/restaurantAuth.js";
import { upload } from "../middleware/multer.js";




// Public Routes
router.get("/getMenu",  getMenuItems);
router.get('/MenuDetails/:menuId' ,getMenuItemDetails);

// Admin Routes (Requires restaurant authentication)
router.post("/add-menu",  restaurantAuth, upload.single("image") , addMenuItem);  // Add menu item (Admin)
router.put("/updateMenu/:menuId", restaurantAuth, updateMenuItem);
router.delete("/deleteMenu/:menuId",restaurantAuth, deleteMenuItem);  // Delete menu item (Admin)

export  { router as menuRouter };
