import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const userSignup = async (req, res, next) => {
    try {
        console.log("hitted");

        const { name, email, password, mobile, profilePic } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const userData = new User({ name, email, password: hashedPassword, mobile, profilePic, role: "user" });
        await userData.save();

        const token = generateToken(userData._id);
        res.cookie("token", token, {});

        return res.json({ data: userData, message: "user account created" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExist = await User.findOne({ email });
        userExist.role = "user";

        if (!userExist) {
            return res.status(404).json({ message: "user does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(userExist._id,"user");
        res.cookie("token", token);

        // delete userExist._doc.password;  one method to delete the property of an object #mongodb

        //second method
        {
            const { password, ...userDataWithoutPassword } = userExist._doc;
            return res.json({ data: userDataWithoutPassword, message: "user login success" });
        }
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const userProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const userData = await User.findById(userId).select("-password");
        userData.role = "user";
        return res.json({ data: userData, message: "user profile fetched" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        return res.json({ message: "user logout success" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const checkUser = async (req, res, next) => {
    try {
        return res.json({ message: "user autherized" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const userProfileUpdate = async (req, res, next)=>{

    try{
        const userId = req.user.id;
        const { name, email, mobile, profilePic} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }


        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.profilePic = profilePic || user.profilePic;
        
        await user.save();

        {
            const {password,  ...userDataWithoutPassword} = user_doc;
        return res.json({data :userDataWithoutPassword, message:"Profile updated succesfully"});
        }
        
    



    }catch (error){
        return res.status(404).json({message:error.message || "internal server error"})

    }

};