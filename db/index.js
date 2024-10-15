const db = require("mongoose");
 
require("dotenv").config();

db.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.error("Database Connection Failed:", err);
});

const AdminSchema = new db.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


const UserSchema = new db.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchased: [{
        type: db.Schema.Types.ObjectId,
        ref: 'Course'
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
