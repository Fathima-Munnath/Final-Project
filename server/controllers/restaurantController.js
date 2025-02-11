import { Restaurant } from "../models/restaurantModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const restaurantSignup = async (req, res, next) => {
    try {
        console.log("Signup API hit");

        const { name, email, password, mobile, location, profilePic, menuItems } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isRestaurantExist = await Restaurant.findOne({ email });

        if (isRestaurantExist) {
            return res.status(400).json({ message: "Restaurant already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const restaurantData = new Restaurant({ 
            name, 
            email, 
            password: hashedPassword, 
            mobile,
            location, 
            profilePic, 
            menuItems 
        });

        await restaurantData.save();

        return res.status(201).json({ data: restaurantData, message: "Restaurant account created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const restaurantLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const restaurantExist = await Restaurant.findOne({ email });

        if (!restaurantExist) {
            return res.status(404).json({ message: "Restaurant does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, restaurantExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(restaurantExist._id,"restaurant");
        res.cookie("token", token, { httpOnly: true });
        {
            const { password, ...restaurantDataWithoutPassword } = restaurantExist._doc;
            return res.json({ data: restaurantDataWithoutPassword, message: "Restaurant login successful" });
        }

       
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const restaurantProfile = async (req, res, next) => {
    try {
        const restaurantId = req.restaurant.id;
        
        const restaurantData = await Restaurant.findById(restaurantId).select("-password");
        
        if (!restaurantData) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        return res.json({ data: restaurantData, message: "Restaurant profile fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const restaurantLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        return res.json({ message: "Restaurant logout successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const checkRestaurant = async (req, res, next) => {
    try {
        return res.json({ message: "restaurant autherized" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const restaurantProfileUpdate = async (req, res, next)=>{
    try{
        const restaurantId = req.restaurant.id;
        const{name, email, mobile, profilePic} = req.body;

        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant){
            return res.status(404).json({meassage:"no restaurant found"})
        }

        
        restaurant.name = name ||  restaurant.name;
        restaurant.email = email ||  restaurant.email;
        restaurant.mobile = mobile || restaurant.mobile;
        restaurant.profilePic = profilePic ||  restaurant.profilePic;
        
        await restaurant.save();

        
            const{ password,  ...restaurantDataWithoutPassword} = restaurant._doc;
            return res.json({data:restaurantDataWithoutPassword, message:"Profile updated successfully"});
        
        

       
    }catch (error){
        return res.status(404).json({message:error.message || "internal server error"})

    }

};