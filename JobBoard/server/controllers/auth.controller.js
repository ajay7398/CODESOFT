import User from "../models/user.model.js";
import getToken from "../utils/token.js";
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {

    try {

        const { name, email, password,role } = req.body;


        if (!name || !email || !password ) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const person =await User.findOne({email});
        if (person) {
            return res.status(400).json({ message: "user already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword,role });


        const info = {
            id: user._id,
            name,
            email,
            role
        }
        const token = await getToken(info);
         res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        const userData = {
  id: user._id,
  name: user.name,
  email: user.email,
  role
};

        res.status(200).json({user:userData, message: "signup successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}



export const login = async (req, res) => {
    
    try {
    
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "user does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const info = {
            id: user._id,
            name: user.name,
            email: user.email,
            role:user.role
        };

        const token = await getToken(info);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        const userData = {
  id: user._id,
  name: user.name,
  email: user.email,
  role:user.role
};

        res.status(200).json({
            message: "Login successful",
           user:userData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const logout = (req, res) => {
    res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
    res.status(200).json({ message: "Logged out successfully" });
};