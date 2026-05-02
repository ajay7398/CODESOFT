import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
   
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

     res.cookie("token", token, {
    httpOnly: true, // 🔐 cannot access from JS (security)
    secure: process.env.NODE_ENV === "production", // only https in prod
    sameSite: "Lax", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(401).json({message:"all fields are required"})
    }
    const user = await User.findOne({ email });

    if(!user){
      return res.status(401).json({message:"user not found"})
    }



    const isValid=await bcrypt.compare(password, user.password);
    if(!isValid){
       return res.status(401).json({message:"incorrect password"});
    }

       const token = generateToken(user._id);

     res.cookie("token", token, {
    httpOnly: true, // 🔐 cannot access from JS (security)
    secure: process.env.NODE_ENV === "production", // only https in prod
    sameSite: "Strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
      res.status(200).json({user});
 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe=async(req,res)=>{
try {
  const user=req.user;
  res.status(200).json({user});
} catch (error) {
  res.status(500).json({message:`getme error : ${error}`})
}
}