const db = require("mongoose");


db.connect("mongodb+srv://animeshkn:sIIjWrIT13ymxFqd@cluster0.7kaje.mongodb.net/course").then( ()=>{
    console.log("Database Connected Successfully");
})

const AdminSchema = new db.Schema({
    username : String,
    password : String
});

const UserSchema = new db.Schema({
    username : String,
    password : String,
    purchased : [{
       type : db.Schema.Types.ObjectId,
       ref : 'Course'
    }]
});

const CourseSchema = new db.Schema({
    title : String,
    description : String,
    imageLink : String,
    price : Number
});


const Admin = db.model('Admin',AdminSchema);
const User = db.model('User',UserSchema);
const Course = db.model('Course',CourseSchema);


module.exports = {
    Admin,
    User,
    Course
};
