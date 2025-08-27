import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
  
  // generate the token it taken 3 args
  // first to diff b/w users, 2nd the jwt secret key and
  // third the options usually we provide the expiry
  const token = jwt.sign( {userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })

  // After generating we will be sending back the token in cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite : "strict", // CSRF cross-site request forgery
    secure: process.env.NODE_ENV !== "development"
  })
}