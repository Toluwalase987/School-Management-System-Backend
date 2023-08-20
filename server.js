const app = require("./app");
const http = require("http");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const ratelimiter = require("express-rate-limit");
const isLoggedIn = require("./middlewares/isLoggedIn");
const isAdmin = require("./middlewares/isAdmin");
require("dotenv").config();
const dbConnect = require("./dbConnect");
const {
  register,
  login,
  edit,
  forgotpassword,
  deleted,
  reset,
  getAdminController,
  getAllAdminController,
} = require("./controllers/adminControllers");
const limiter = ratelimiter({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
  message: "too many requests, Please try after 5 minutes",
});
app.use(limiter);

const server = http.createServer(app);
//Register Admin
app.post("/api/v1/admin/register", register);

//Login Admin
app.post("/api/v1/admin/login", login);

//Get Admin  Profile
app.get("/api/v1/admin", isLoggedIn, isAdmin, getAdminController);
//Get All Admin Profile
app.get("/api/v1/admin", isLoggedIn, getAllAdminController);
//Edit Admin
app.put("/api/v1/admin/edit/:id", isLoggedIn, edit);

//Delete Admin
app.delete("/api/v1/admin/deleted/:id", deleted);

//forgot Password
app.post("/api/v1/admin/forgotpassword", forgotpassword);

//Reset Password
app.put("/api/v1/admin/resetpassword", reset);
app.use(globalErrorHandler);

PORT = 2023;
server.listen(PORT, () => {
  console.log("Aliyu is running my next internship/job");
});
