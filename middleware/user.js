const {User} = require("../db/index");

async function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    if(!username || !password)
        return res.status(400).send({message :"Missing Username Or Passowrd"});

    try {
        const check = await User.findOne({
            username : username,
            password : password
        });
    
        if(!check)
            return res.status(400).send({message :"Username or Password does not match"});
    
        next();
    } catch (error) {
        return res.status(500).send({
            message : "Server Error"
        })
    }
}

module.exports = userMiddleware;