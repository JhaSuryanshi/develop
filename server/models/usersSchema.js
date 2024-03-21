const mongoose = require('mongoose');
const validator = require('validator');
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const keysecret = process.env.SECRET_KEY;
const usersSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
 },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Not a valid email"
        }
    },
    mobilenumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }, 
    message : {
        type: String,
        required: true,
        trim: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

usersSchema.methods.generateAuthToken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        throw error; 
    }
}

const User = mongoose.model("champ", usersSchema); 

module.exports = User;
