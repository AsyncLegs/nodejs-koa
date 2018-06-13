import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';
const SummarySchema = new Schema({
    hash: {
        type: String,
        unique: 'Hash must be unique',
    },
    userHash: {
        type: String,
        required: 'User hash is required',
    },
    title: {
        type: String,
        required: 'Title is required',
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    skype: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true,
    },
    tags: {
        type: [String],
        required: 'Tags are required',
        trim: true,
    },
    history: [{
        companyName: {
            type: String,
            required: 'Company name is required',
            trim: true,
        },
        title: {
            type: String,
            required: 'Title is required',
            trim: true,
        },
        date: {
            start: {
                type: Date,
                required: 'Start date is required',
            },
            end: {
                type: Date,
                required: 'End date is requried',
            },
        },
        currentWork: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: 'Description is required',
            trim: true,
        },
    }],

}, {
    timestamps: true,
});
SummarySchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});
SummarySchema.statics.createFields = ['title', 'phone', 'skype', 'description', 'history', 'tags', 'hash'];

export default mongoose.model('summary', SummarySchema);
