'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    orderList: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        sparse: true
    }],
    cart: [{
        size: String,
        qty: Number,
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
}, {
    usePushEach: true
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
