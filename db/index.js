const db = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt
require("dotenv").config();

db.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.error("Database Connection Failed:", err);
});

// Admin Schema
const AdminSchema = new db.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// User Schema
const UserSchema = new db.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchased: [{
        type: db.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Course Schema
const CourseSchema = new db.Schema({
    title : String,
    description : String,
    imageLink : String,
    price : Number
});

const Admin = db.model('Admin', AdminSchema);
const User = db.model('User', UserSchema);
const Course = db.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
};
