const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    pass: {
        type:String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords MUST be at least 8 characters"]
    },

},{timestamps: true})

    // AdminSchema.virtual("confirmPassword")
    //     .get(()=>this._confirmPassword)
    //     .set((value)=>this._confirmPassword = value)

    // AdminSchema.pre("validate", function(next){
    //     if(this.pass !== this.confirmPassword){
    //         this.invalidate("confirmPassword", "Passwords do not match")
    //         console.log("Passwords don't match!")
    //     }
    //     next()
    // })

            // AdminSchema.virtual('confirmPassword')
            // .get( () => this._confirmPassword )
            // .set( value => this._confirmPassword = value );

            // AdminSchema.pre('validate', function(next) {
            // if (this.pass !== this.confirmPassword) {
            // this.invalidate('confirmPassword', 'Password must match confirm password');
            // }
            // next();
            // });

    const Admin = mongoose.model("Admin", AdminSchema)

    module.exports = Admin