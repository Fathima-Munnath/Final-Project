import e from "express";
import { restaurantLogin, restaurantLogout,restaurantProfile,restaurantSignup, checkRestaurant,  restaurantProfileUpdate } from "../controllers/restaurantController.js"

import { restaurantAuth } from "../middleware/restaurantAuth.js";

const router = e.Router();

//signup
router.post("/signup", restaurantSignup);

//login
router.put("/login", restaurantLogin);

//profile
router.get("/profile", restaurantAuth,restaurantProfile);

//logout
router.get("/logout", restaurantAuth,restaurantLogout);

//profile-update

router.put("/profile-update", restaurantAuth, restaurantProfileUpdate);
//forgot-password
//change-password
//account-deactivate


//check-restaurant
router.get("/check-restaurant", restaurantAuth, checkRestaurant);

export { router as restaurantRouter };