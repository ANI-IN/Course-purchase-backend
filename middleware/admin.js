const {Admin} = require("../db/index")

async function adminMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    if(!username || !password)
        return res.status(400).send({message : "Missing Username Or Passowrd"});

    try {
        const Check = await Admin.findOne({
            username : username,
            password : password
        });
        if(!Check)
            return res.status(400).send({message :"Username or Password does not match"});
        next();
    } catch (error) {
        return res.status(500).send({Message : "Server Error"});
    }
} 


module.exports = adminMiddleware;