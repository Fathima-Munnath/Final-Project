import mongoose, { Schema } from "mongoose";


const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  mobile: {
    type: String,
    required: true,
},
  location: {
    street: String,
    city: String,
    pincode: String,
  },
  profiePic: {
    type: String,
    default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
},
  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
  }],
}, { timestamps: true });

export const Restaurant =  mongoose.model("Restaurant", restaurantSchema);