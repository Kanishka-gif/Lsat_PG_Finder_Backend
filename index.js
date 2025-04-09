// mongo connection (First step)
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const express = require("express");
const userRoutes = require('./routes/api/user.route'); 
const backend = express();

backend.use(express.json());



// CORS (Second step) 2
backend.use(cors({
  origin: "*",
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
})
);




// routing 3
backend.use(routes);
backend.use("/api/auth/users", userRoutes);



// mongoose connect 1
mongoose.connect("mongodb+srv://gkanishka989:vRPLQnGUM1ItFLN5@cluster0.vqyox.mongodb.net/PGFinderDB?retryWrites=true&w=majority&appName=Cluster0")

.then(() =>
    console.log("Mongo Connected")
  )
  .then(() => {
    const PORT = 3000;
    backend.listen(PORT, () => {
      console.log("Server started on port", (PORT));
    });
  })
  .catch((err) => console.log(err));