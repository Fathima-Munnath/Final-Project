import mongoose, { Schema } from "mongoose"

const addressSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
 houseName: {
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
  mobile: {
    type: String,
    required: true,
   
  },
  landmark: {
    type: String
  },


}, { timestamps: true });

export const Address = mongoose.model("Address", addressSchema);