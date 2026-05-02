import jwt from "jsonwebtoken"

const getToken=(info)=>{
const token=jwt.sign(info,process.env.JWT_SECRET,{expiresIn:24*60*60*1000});
return token;
}

export default getToken;