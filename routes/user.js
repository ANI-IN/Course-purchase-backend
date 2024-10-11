const {Router} = require("express");
const {User,Course} = require("../db/index");
const userMiddleware = require("../middleware/user");

const router = Router();


router.post("/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

   try {
            const check = await User.create({
            username : username,
            password : password
            });
            
            if(check)
                return res.status(201).send({message : "User Created Successfully"});
   } catch (error) {
    return res.status(500).send({Message : "Server Error"});
   }
})

router.get("/courses",async (req,res)=>{
    try {
        const check = await Course.find({});
        res.json({
            courses : check
        });

    } catch (error) {
        return res.status(500).send({Message : "Server Error"});
    }
})


router.post("/courses/:courseId",userMiddleware, async(req,res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;
    
   try {
        const check = await User.updateOne(
            { username: username },
            { $push : {purchased : courseId}});

        if(check)
            return res.status(201).send({message : "Purchase Complete"});

   } catch (error) {
            return res.status(500).send({Message : "Server Error"});
   }
    

})


router.get("/purchasedCourses",userMiddleware,async(req,res)=>{
    try {
        const user = await User.findOne({
            username : req.headers.username
        })

        const course = await Course.findOne({
            _id : {
                "$in" : user.purchased
            }
        });

        res.json({
            courses : course
        });


    } catch (error) {
        
    }
})


module.exports = router;