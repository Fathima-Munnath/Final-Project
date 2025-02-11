import { MenuItem } from "../models/menuModel.js";
import { Review } from "../models/reviewModel.js";

export const addReview = async (req, res) => {
    try {
        const { menuItemId, rating, comment } = req.body;
        const userId = req.user.id;

        // Validate if the course exists
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "MenuItem not found" });
        }

        if (rating > 5 || rating <= 1) {
            return res.status(400).json({ message: "Please provide a proper rating" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate({ userId, menuItemId }, { rating, comment }, { new: true, upsert: true });

        // Optionally, you can update the course's average rating here

        res.status(201).json({ data: review, message: "review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getMenuItemReviews = async (req, res) => {
    try {
        const { menuItemId } = req.params;

        const reviews = await Review.find({ menuItemId }).populate("userId", "name").sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this MenuItem" });
        }

        res.status(200).json({ data: reviews, message: "Reviews fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


export const getAverageRating = async (req, res) => {
    try {
        console.log("Received request for:", req.params);  // Debug log

        const { menuItemId } = req.params;

        if (!menuItemId) {
            return res.status(400).json({ message: "MenuItemId is required" });
        }

        const reviews = await Review.find({ menuItemId });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this menu item" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ data: averageRating, message: "Average rating fetched successfully" });
    } catch (error) {
        console.error("Error in getAverageRating:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
