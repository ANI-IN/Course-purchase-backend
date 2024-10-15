const {Router} = require("express");
const {User,Course} = require("../db/index");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const router = Router();
 


router.post("/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try {
         
        const newUser = await User.create({
            username: username,
            password: password
        });

        if (newUser) {
            return res.status(201).send({ message: "User Created Successfully" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});

router.get("/courses",async (req,res)=>{
    try {
        const courses = await Course.find({});
        res.json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});


router.post("/courses/:courseId",userMiddleware, async(req,res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;
    
    try {
        const updateResult = await User.updateOne(
            { username: username },
            { $push: { purchased: courseId } }
        );

        if (updateResult.modifiedCount > 0) {
            return res.status(201).send({ message: "Purchase Complete" });
        } else {
            return res.status(400).send({ message: "Purchase Failed or Course Already Purchased" });
        }
    } catch (error) {
        console.error("Error during course purchase:", error);
        return res.status(500).send({ message: "Server Error" });
    }
    

})


router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    const username = req.user.username; // Access from decoded JWT token

    try {
        const user = await User.findOne({ username });
        const purchasedCourses = await Course.find({
            _id: { $in: user.purchased }
        });

        res.json({ courses: purchasedCourses });
    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

 
        const token = jwt.sign({ username: user.username }, config.secret, { expiresIn: "1h" });

        return res.status(200).json({ token });
        
    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).send({ message: "Server Error" });
    }
});

module.exports = router;