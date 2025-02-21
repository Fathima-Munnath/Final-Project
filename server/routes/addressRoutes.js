import express from "express";
const router = express.Router();
import {createAddress,getAddress, updateAddress } from "../controllers/addressController.js"; 
import{userAuth}from "../middleware/userAuth.js";



router.post("/add-address", userAuth, createAddress); // Changed path to "/"
router.get("/get-address", userAuth, getAddress);
router.get("/update-address", userAuth, updateAddress);





export  { router as addressRouter };
