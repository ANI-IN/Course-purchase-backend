const express = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db/index")

const router = express.Router(); 
router.use(express.json());

router.get("/",(req,res)=>{
    res.status(200).send({message : "All good"});
})


router.post("/signup", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

   try {
            const check = await Admin.create({
            username : username,
            password : password
            });
            
            if(check)
                return res.status(201).send({message : "Admin Created Successfully"});
   } catch (error) {
    return res.status(500).send({Message : "Server Error"});
   }
})


router.post("/courses", adminMiddleware,async(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    try {
       
        const check = await Course.create({
            title: title,
            description : description, 
            imageLink : imageLink,
            price : price
        });

        if(check)
            return res.status(201).send({message : `Course created successfully`,courseId: check._id});

    } catch (error) {   
        return res.status(500).send({Message : "Server Error"});
        
    }

})

router.get("/courses", adminMiddleware, async(req,res)=>{
    try {
        const response = await Course.find({
            
        })
        res.json({
            Courses : response
        });
    } catch (error) {
        return res.status(500).send({Message : "Server Error"});
    }
})

module.exports = router;