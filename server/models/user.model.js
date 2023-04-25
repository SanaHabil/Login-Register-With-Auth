const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "First name is required"]
    },
    lname: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    pass: {
        type:String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords MUST be at least 8 characters"]
    },

},{timestamps: true})

    UserSchema.virtual("confirmPassword")
        .get(()=>this._confirmPassword)
        .set((value)=>this._confirmPassword = value)

    UserSchema.pre("validate", function(next){
        if(this.pass !== this.confirmPassword){
            this.invalidate("confirmPassword", "Passwords do not match")
            console.log("Passwords don't match!")
        }
        next()
    })

            UserSchema.virtual('confirmPassword')
            .get( () => this._confirmPassword )
            .set( value => this._confirmPassword = value );

            UserSchema.pre('validate', function(next) {
            if (this.pass !== this.confirmPassword) {
            this.invalidate('confirmPassword', 'Password must match confirm password');
            }
            next();
            });

    const User = mongoose.model("User", UserSchema)

    module.exports = User