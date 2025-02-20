import mongoose, { Schema } from "mongoose"

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    default: "India"
  },
  landmark: {
    type: String
  },


}, { timestamps: true });

export const Address = mongoose.model("Address", addressSchema);