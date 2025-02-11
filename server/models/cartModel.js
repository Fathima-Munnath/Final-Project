import { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        restaurantId: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        items: [
            {
                menuItemId: {
                    type: Schema.Types.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true,
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    { timestamps: true }
);

// Method to calculate total cart price
cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const Cart = model("Cart", cartSchema);
