import jwt from "jsonwebtoken"


export const isAuthenticated = (req, res, next) => {
   try {
     const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user=jwt.verify(token,process.env.JWT_SECRET);
req.user=user;
    next();
   } catch (error) {
    console.log(error)
   }
};

