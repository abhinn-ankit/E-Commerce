const express = require('express');
const router = express.Router();
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Order = require('../models/order');
const User = require('../models/user');
const Cart = require('../models/cartItem');

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
            for (let uc of user.cart) {
                if (String(uc.productId) == String(cart.productId) && String(uc.size) == String(cart.size)) {
                    uc.qty = uc.qty + cart.qty;
                    user.save();
                    return res.status(201).json({
                        message: 'Successfully updated product in cart',
                        obj: uc
                    });
                }
            }
            user.cart.push(cart);
            user.save();
            console.log(user.cart);
            return res.status(201).json({
                message: 'Successfully added in cart',
                obj: cart
            });
        });
    });
});

router.patch('/modifyCartItem/:id', function (req, res, next) {
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
            for (let uc of user.cart) {
                if (String(uc.productId) == String(cart.productId) && String(uc.size) == String(cart.size)) {
                    uc.qty = uc.qty - cart.qty;
                    user.save();
                    return res.status(201).json({
                        message: 'Successfully updated product in cart',
                        obj: uc
                    });
                }
            }
        });
    });
});

router.patch('/removeCartItem/:id', function (req, res, next) {
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
            for ( let i = 0; i < user.cart.length; i++ ) {
                if (String(user.cart[i].productId) == String(cart.productId) && String(user.cart[i].size) == String(cart.size)) {
                    console.log("Before \n\n" + user.cart);
                    let uc = user.cart[i];
                    user.cart.splice(i, 1);
                    console.log("After\n\n" + user.cart);
                    user.save();
                    return res.status(201).json({
                        message: 'Successfully removed product in cart',
                        obj: uc
                    });
                }
            }
        });
    });
});

router.post('/order/:id', function (req, res, next) {
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
            console.log(req.body.productList);
            const order = new Order({
                productList: req.body.productList,
                orderDate: req.body.orderDate,
                userAccountID: req.body.userAccountID,
                receiverName: req.body.receiverName,
                contactNumber: req.body.contactNumber,
                state: req.body.state,
                zipCode: req.body.zipCode,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine1
            });
            order.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                user.orderList.push(result._id);
                user.update({$set: {cart:[]}}, function (err, affected) {
                    if(err) {
                        console.log(err);
                    }
                    else
                        console.log(affected);
                });
                user.save();
                return res.status(201).json({
                    message: 'Successfully Placed order',
                    obj: result
                });
            });
        });
    });
});

router.get('/:id', function (req, res, next) {
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
            res.status(201).json({
                message: 'Current User',
                obj: user,
                userId: user._id
            });
        });
    });
});

router.get('/order/:id', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        Order.findById(req.params.id, function (err, order) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!order) {
                return res.status(500).json({
                    title: 'No order found',
                    error: {message: "Order not found"}
                });
            }
            res.status(200).json({
                message: 'Order Found',
                obj: order,
                orderID: order._id,
            });
        });
    });
});

module.exports = router;