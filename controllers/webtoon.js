const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const User = models.user;
const Webtoon = models.webtoon;
const Sequelize = require('sequelize');

exports.index = (req, res) => {
    Webtoon.findAll({
        include: [{
            model: User,
            as: 'createdBy',
            attributes: ['name']
        }]
    })
        .then(webtoons => res.send(webtoons))
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.showWebtoon = (req, res) => {
    Webtoon.findOne({
        where: {
            title: req.params.title
        }
    })
        .then(webtoon => res.send(webtoon))
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.showChoicesWebtoons = (req, res) => {
    const { gt, gte, lte, ne, in: opIn } = Sequelize.Op;
    Webtoon.findAll({
        where: {
            favourite_count: {
                [gte]: 100,
            }
        },
        limit: 3,
        attributes: [['image', 'url'], 'title']
    })
        .then(webtoons => res.send(webtoons))
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.showPolpularWebtoons = (req, res) => {
    const { gt, gte, lte, ne, in: opIn } = Sequelize.Op;
    Webtoon.findAll({
        where: {
            favourite_count: {
                [gte]: 100
            }
        },
        include: [{
            model: User,
            as: 'createdBy',
            attributes: ['name']
        }]
    })
        .then(webtoons => res.send(webtoons))
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.showMyWebtoons = (req, res) => {
    Webtoon.findAll({
        where: {
            created_by: req.params.user_id
        },
        // include: [{
        //     model: User,
        //     as: 'createdBy',
        //     attributes: ['name']
        // }]
    })
        .then(webtoons => res.send(webtoons))
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.createMyWebtoon = (req, res) => {
    const { title, genre, image } = req.body;
    if (title && genre && image) {
        Webtoon.create({
            title,
            genre,
            image,
            created_by: req.params.user_id
        })
            .then(webtoon => res.send(webtoon))
            .catch((e) => {
                res.send({
                    error: true,
                    message: errorHandler.showMessage(e)
                });
            });
    } else {
        res.send({
            error: true,
            message: 'all field cannot be empty'
        });
    }
}

exports.updateMyWebtoon = (req, res) => {
    const { title, genre, image } = req.body;
    if (title || genre || image) {
        Webtoon.update(
            req.body,
            {
                where: { id: req.params.webtoon_id, created_by: req.params.user_id },
            })
            .then(() => {
                Webtoon.findOne({ where: { id: req.params.webtoon_id } })
                    .then(webtoons => res.send(webtoons));
            })
            .catch((e) => {
                res.send({
                    error: true,
                    message: errorHandler.showMessage(e)
                });
            });
    } else {
        res.send({
            error: true,
            message: 'all field cannot be empty'
        });
    }
}

exports.deleteMyWebtoon = (req, res) => {
    const { user_id, webtoon_id } = req.params;
    Webtoon.destroy({ where: { id: webtoon_id, created_by: user_id } })
        .then(result => {
            if (result) {
                res.send({
                    id: webtoon_id
                })
            } else {
                res.send({
                    error: true,
                    message: 'delete webtoon failed'
                })
            }
        })
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}