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


// Final 

const router = require("express").Router();
const authRoutes = require("./Auth.route");
const userRoutes = require("./user.route");
const mailRoutes = require("./mail.route");
const contactRoutes = require("./contact.route");
const pgRoutes = require("./pg.route");
const wishRotues = require("./wishlist.route");

router.use("/auth", authRoutes);
router.use("/auth/users", userRoutes);
router.use("/mail", mailRoutes);
router.use("/contact", contactRoutes);
router.use("/wishRotues", wishRotues);
router.use("/pgs", pgRoutes);


//2nd method with require 

//router.use("/mail", require("./mail.route"));
// router.use("/contact", require("./contact.route"));
// router.use("/pg",require("./pg.route"));

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
