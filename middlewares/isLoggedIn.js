const verifyToken = require("../utils/verifyToken");
const Admin = require("../models/staff/Admin");
const isLoggedIn = async (req, res, next) => {
  //Get token from header
  const headerObj = req.headers;
  const token = headerObj.authorization.split(" ")[1];
    // const token = headerObj && headerObj.Authorization && headerObj.authorization.split(" ")[1];
  //Verify token()
  if(!token){
    return res.status(404).json({
        status:'failed',
        message:"this token is invalid"
    });
  }
  const verifiedToken = verifyToken(token);
  const user = await Admin.findById(verifiedToken.id).select(
    "name email role"
  );
  if (user) {
   
    //Save the user into req.object
    req.userAuth = user;
    next();
  } else {
    res.status(404).json({
        status:'failed',
        message:"this token is invalid"
    });
  }
};

module.exports = isLoggedIn;
