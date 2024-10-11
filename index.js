const express = require("express");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const app = express();

 
app.use(express.json());

 
app.use("/user", userRoutes);

 
app.use("/admin", adminRoutes);

 
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
