const { verify } = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/staff/Admin");
const {globalErrorHandler} = require('../middlewares/globalErrorHandler')
const generateToken = require("../utils/generateToken");
const verifyToken = require("../utils/verifyToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if Admin exist
  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    throw new Error({message:"Admin exist", status:404});
  }

  //Register Admin
  const user = await Admin.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin created successfully"
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: "User does not exist" });
  }
  if (user && (await user.verifiedPassword(password))) {
    const token = generateToken(user._id);
    let verify;
    if (token) {
      verify = verifyToken(token);
      console.log(verify);
    }
    res.status(200).json({
      status: "Success",
      data: generateToken(user._id),
    });
  } else {
    return res.json({ message: "Invalid Credentials" });
  }
});

const getAdminController = async (req, res) => {
  // console.log(req.userAuth._id);
  const admin = await Admin.findById(req.userAuth._id).select("-password");
  if (!admin) {
    return { message: "Admin does not exist" };
  } else {
    res.status(200).json({
      status: "Success",
      data: admin,
    });
  }
};

const getAllAdminController = asyncHandler(async (req, res) => {
  const admin = await Admin.find().select("-password");
  res.status(200).json({
    status: "Success",
    data: admin,
  });
});

const edit = (req, res) => {
  console.log(req.userAuth);
  res.status(201).json({
    status: "Success",
    data: "Profile has been edited",
  });
};

const deleted = (req, res) => {
  res.status(201).json({
    status: "Success",
    data: "Profile has been deleted",
  });
};

const forgotpassword = (req, res) => {
  res.status(201).json({
    status: "Success",
    data: "An email has been sent to you, please click the link to reset your password",
  });
};

const reset = (req, res) => {
  res.status(201).json({
    status: "Success",
    data: "Password has been rest",
  });
};

module.exports = {
  register,
  login,
  edit,
  deleted,
  forgotpassword,
  reset,
  getAdminController,
  getAllAdminController,
};
