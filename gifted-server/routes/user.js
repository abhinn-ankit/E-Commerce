const express = require('express');
const router = express.Router();
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const async = require('async');

const User = require('../models/user');
const Cart = require('../models/cartItem');
const Product = require('../models/product');

router.post('/', function (req, res, next) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bCrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User Created',
            obj: result
        });
    });
});

router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bCrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            user: user
        });
    });
});

router.patch('/cart/:id', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenicated',
                error: err
            });
        }
        User.findById(decoded.user._id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            const cart = new Cart({
                size: req.body.size,
                qty: req.body.qty,
                productId: req.body.productId
            });
            console.log(user.cart.size);
            for (let i = 0; i < user.cart.size; i++) {
                let uc = user.cart[i];
                console.log(uc);
                if (uc.productId.equals(cart.productId) && uc.size.equals(cart.size)) {
                    uc.qty = uc.qty + cart.qty;
                    return res.status(201).json({
                        message: 'Successfully updated product in cart',
                        obj: uc
                    });
                }
            }
            user.cart.push(cart);
            user.save();
            console.log(user);
            return res.status(201).json({
                message: 'Successfully added in cart',
                obj: cart
            });
        });
    });
})
;

module.exports = router;