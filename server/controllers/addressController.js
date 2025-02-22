import { Address } from "../models/addressModel.js";


export const createAddress = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }
        const { houseName,city, state,postalCode, mobile,landmark } = req.body;
        if (!houseName || !city || !state || !postalCode || !mobile || !landmark) {
            return res.status(404).json({ message: "All fields are required" });
        };

      
        const userId = req.user.id;
        const address = new Address({ 
            houseName,
            city, 
            state,
            postalCode,
            mobile,
            landmark,
            userId: userId 
        });
        await  address .save()
        return res.json({ data: address , message: "address created" });
    }
    catch (error) {
        return res.status(404).json({ message: error.message || "internal server error" });
    };
};


export const getAddress = async (req, res) => {
    try {
        const  userId = req.user.id; // Get userId from query params
        //return res.status(200).json({data:userId, message:"kittatha user id"});
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const address = await  Address.find({ userId }).populate("userId"); 
        // Fetch only user-specific orders
        return res.status(200).json({data:address });
        
    } catch (error) {
        console.error("Error fetching address:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const updateAddress = async (req,res)=> {
    try {
            const {addressId }= req.params;
            const {  houseName,city, state,postalCode, mobile,landmark} = req.body;
            const address = await Address.findById(addressId);
            if (!address) {
                return res.status(404).json({ message: "Address not found" });
            }
            address. houseName = houseName ||  address. houseName
            address.city = city || address.city;
            address.state = state || address.state;
            address.postalCode = postalCode ||  address.postalCode;
            address.mobile = mobile || address.mobile;
            address.landmark=landmark|| address.landmark;

            await  address.save();
            
        } catch (error) {
            return res.status(404).json({ message: error.message || "internal server error" })
        }

};

export const removeAddress = async (req,res)=>{
    try {
            const { addressId } = req.params;
    
           
            // Check if the menu item exists
            const address = await Address.findById(addressId);
            if (!address) {
                return res.status(404).json({ message: "Address item not found" });
            }
    
            // Delete the menu item
            await address .deleteOne();
    
            return res.status(200).json({ message: "Address item deleted successfully" });
    
        } catch (error) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
}