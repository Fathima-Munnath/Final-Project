import express from "express";
const router = express.Router();
import {createAddress,getAddress, updateAddress, removeAddress } from "../controllers/addressController.js"; 
import{userAuth}from "../middleware/userAuth.js";



router.post("/add-address", userAuth, createAddress); // Changed path to "/"
router.get("/get-address", userAuth, getAddress);
router.put("/update-address/:addressId", userAuth, updateAddress);
router.delete("/delete-address/:addressId",userAuth, removeAddress);





export  { router as addressRouter };
