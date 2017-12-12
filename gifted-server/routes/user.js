const express = require('express');
const router = express.Router();
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
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
        if(!user) {
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
            const cart = req.body.cart;
            cart.forEach(function (c) {
                user.cart.forEach(function (uc) {
                    if ( uc.productId === c.productId && uc.size === c.size ) {
                        uc.qty = uc.qty + c.qty;
                        return res.status(201).json({
                            message: 'Successfully updated product in cart',
                            obj: uc
                        });
                    }
                });
            });
            return res.status(201).json({
                message: 'Successfully added in cart',
                obj: cart
            });
        });
    });
});

module.exports = router;