const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim:true,
            minLength: 8,
            maxLength: 20,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 128,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 10,
            maxLength: 32
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User