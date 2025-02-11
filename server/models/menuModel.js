import mongoose, { Schema }  from "mongoose"

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type:String,
    default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  },

  offers: [
    {
      description: String,
      validTill: Date,
    }
  ],
  
  availability: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);

