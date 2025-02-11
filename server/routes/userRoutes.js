import e from "express";
import { userLogin, userLogout, userProfile, userSignup, checkUser, userProfileUpdate } from "../controllers/userController.js"

import { userAuth } from "../middleware/userAuth.js";

const router = e.Router();

//signup
router.post("/signup", userSignup);

//login
router.put("/login", userLogin);

//profile
router.get("/profile", userAuth, userProfile);

//logout
router.get("/logout", userAuth, userLogout);

//profile-update

router.put("/profile-update", userAuth, userProfileUpdate);
//forgot-password
//change-password
//account-deactivate


//check-user
router.get("/check-user", userAuth, checkUser);

export { router as userRouter };