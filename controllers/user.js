const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcrypt');
const errorHandler = require('../handlers/errorHandler.js');

const User = models.user;

exports.login = (req, res) => {
    const { email, password } = req.body;

    User
        .findOne({ where: { email } })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (e, result) => {
                    if (e) {
                        res.send({
                            error: true,
                            message: errorHandler.showMessage(e, 'encryption')
                        })
                    } else if (result) {
                        const token = 'Bearer ' + jwt.sign({ userId: user.id }, '12378bhdfhdsj783hjsdf237rhjsd');
                        res.send({
                            id: user.id,
                            name: user.name,
                            token
                        });
                    } else {
                        res.send({
                            error: true,
                            message: 'wrong password!'
                        });
                    }
                })
            } else {
                res.send({
                    error: true,
                    message: 'e-mail not registered!'
                });
            }
        })
        .catch(e => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        })
}

// --------------------------------------------------------------------------------

exports.register = (req, res) => {
    const { email, password, name } = req.body;
    if (email == '' || password == '' || name == '') {
        res.send({
            error: true,
            message: 'field cannot be empty'
        });
    } else {
        bcrypt.hash(password, 10, (e, hash) => {
            if (e) {
                res.send({
                    error: true,
                    message: errorHandler.showMessage(e, 'encryption')
                });
            } else {
                User.create({
                    email,
                    password: hash,
                    name
                })
                    .then((user) => {
                        const token = 'Bearer ' + jwt.sign({ userId: user.id }, '12378bhdfhdsj783hjsdf237rhjsd');
                        res.send({
                            id: user.id,
                            name: user.name,
                            token
                        });
                    })
                    .catch((e) => {
                        res.send({
                            error: true,
                            message: errorHandler.showMessage(e)
                        });
                    });
            }
        });
    }
}

exports.showProfileData = (req, res) => {
    User.findOne({
        where: {
            id: req.params.user_id
        }
    })
        .then(user => {
            res.send({
                profile_image: user.profile_image,
                name: user.name
            });
        })
        .catch(e => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.updateProfileData = (req, res) => {
    if (req.body.name == false && req.file == false) {
        res.send({
            error: true,
            message: 'no request data'
        })
    } else {
        var data = null;
        if (req.body.name != false && req.file != false) {
            data = {
                name: req.body.name,
                profile_image: req.file.path
            }
        } else if (req.body.name != false) {
            data = {
                profile_image: req.file.path
            }
        } else if (req.file != false) {
            data = {
                name: req.body.name
            }
        }

        User.update(data, {
            where: { id: req.params.user_id }
        })
            .then(result => {
                res.send(data)
            })
            .catch(e => {
                res.send({
                    error: true,
                    message: errorHandler.showMessage(e)
                });
            });
    }
}
