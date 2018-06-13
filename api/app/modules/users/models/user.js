import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import pick from 'lodash/pick';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
    email: {
        type: String,
        unique: 'User with email "{VALUE}" already exists',
        lowercase: true,
        required: 'Email is required',
        trim: true,
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true,

    },
    hash: {
        type: String,
        unique: 'Hash must be unique',
    },
    firstName: {
        type: String,
        required: 'First name is required',
        trim: true,

    },
    lastName: {
        type: String,
        required: 'Last name is required',
        trim: true,
    },
}, {
 timestamps: true,
});

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName', 'hash'];
UserSchema.statics.exposedFields = ['email', 'firstName', 'lastName', 'hash'];
UserSchema.methods.serialized = function() {
    return pick(this, UserSchema.statics.exposedFields);
};

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
