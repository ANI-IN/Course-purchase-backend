const express = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index")
const jwt = require("jsonwebtoken");
const config = require("../config")
const router = express.Router(); 
router.use(express.json());
const bcrypt = require("bcrypt"); 

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.create({
            username: username,
            password: password // Password will be hashed automatically before saving (from db/index.js)
        });

        if (admin) {
            return res.status(201).send({ message: "Admin Created Successfully" });
        }
    } catch (error) {
        console.error("Error during admin signup:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});



router.post("/courses", adminMiddleware, async (req, res) => {
    const { title, description, price, imageLink } = req.body;

    try {
         
        const course = await Course.create({
            title: title,
            description: description,
            imageLink: imageLink,
            price: price
        });

        if (course) {
            return res.status(201).send({ message: "Course created successfully", courseId: course._id });
        }
    } catch (error) {
        console.error("Error during course creation:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});


router.get("/courses", adminMiddleware, async (req, res) => {
    try {
        
        const courses = await Course.find({});
        return res.json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});


router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password); // Compare passwords
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, isAdmin: true },
            config.secret,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error during admin sign-in:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});



module.exports = router;