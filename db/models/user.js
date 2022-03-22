const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email!')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },

    address: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        unique: true,
        required: true
    },
})


userSchema.pre('save', async function (next) {
    const user = this

    // for both creation as well as update cases
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
}) 

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}