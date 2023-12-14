const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

let userSchema = new Schema ({
    email: {
        type: String,
        required : true,
        unique: true,
        validate: {
            validator: function(email) {
                return validator.isEmail(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        required: true
    }
});

// password hash
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('User', userSchema);