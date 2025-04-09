// const router = require("express").Router();
// const authRoutes = require("./Auth.route");
// const userRoute = require("./user.route");

// // const categoryRoutes = require("./Category.route");


// router.use("/auth", authRoutes);
// router.use('/users', userRoute);
// // router.use("/category", categoryRoutes);


// router.get("/ping", (req, res) => {
//   res.json({ success: "true", message: "successful request" });
// });

// module.exports = router;


const router = require("express").Router();
const authRoutes = require("./Auth.route");
const userRoutes = require("./user.route");


router.use("/auth", authRoutes);


router.use("/auth/users", userRoutes); 


router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
