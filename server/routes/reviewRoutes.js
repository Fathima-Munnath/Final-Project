import e from "express";
import { addReview, deleteReview, getAverageRating,getMenuItemReviews } from "../controllers/reviewController.js";
import { userAuth } from "../middleware/userAuth.js";

const router = e.Router();

router.post("/add-review", userAuth, addReview);
router.get("/get-reviews/:menuItemId",getMenuItemReviews);
router.delete("/delete-review/:reviewId",userAuth,deleteReview);
router.get('/get-avg-rating/:menuItemId',getAverageRating);


export { router as reviewRouter };