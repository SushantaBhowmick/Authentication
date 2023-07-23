const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Your email address is required"],
        unique:true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
      },
      password: {
        type: String,
        required: [true, "Your password is required"],
        minlength: [8, "Password Should be more than 8 characters"],
      },
      createdAt: {
        type: Date, 
        default: new Date(),
      },
});

// hash the password 
userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,12)
})

module.exports = mongoose.model("User",userSchema)