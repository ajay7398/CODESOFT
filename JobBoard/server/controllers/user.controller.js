import User from "../models/user.model.js";

export const getMe = async (req, res) => {
    
    try {

        const { id } = req.user;
       
        if (!id) {
            return res.status(400).json({ message: "user not authenticated" });
        }

        const user =await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "user does not exist" });
        }

        res.status(200).json({user});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}