const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const User = models.user;
const Webtoon = models.webtoon;
const Episode = models.episode;
const Image = models.image;
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

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
        .then(webtoons => {
            Episode.findAll({
                where: { created_by: req.params.user_id },
                attributes: ['webtoon_id', [Sequelize.fn('count', Sequelize.col('webtoon_id')), 'count']],
                group: ['episode.webtoon_id'],
                order: Sequelize.literal('count DESC')
            })
                .then(episodes => {
                    // console.log(episodes[0].dataValues, episodes[1].dataValues)
                    webtoons.push(episodes)
                    res.send(webtoons)
                })
                .catch(e => errorHandler.showMessage(e));
        })
        .catch((e) => {
            res.send({
                error: true,
                message: errorHandler.showMessage(e)
            });
        });
}

exports.createMyWebtoon = (req, res) => {
    const { title, genre } = req.body;
    if (title && genre) {
        Webtoon.create({
            title,
            genre,
            image: req.file.path,
            favourite_count: 0,
            status: 'unpublished',
            created_by: req.params.user_id
        })
            .then(webtoon => {
                // console.log(req.body.childData.episodes)
                // let newEp = req.body.childData.episodes.map((o) => {
                //     o.webtoon_id = webtoon.id
                //     return o
                // });
                res.send(webtoon)

                // Episode.bulkCreate(req.body.childData.episodes)
                //     .then(episodes => {
                //         // let newImg = req.body.childData.images.map((o, index) => {
                //         //     o.webtoon_id = webtoon.id
                //         // });
                //         // console.log(req.body.childData.images)
                //         Image.bulkCreate(req.body.childData.images)
                //         .then(images => {
                //             // console.log(webtoon)
                //             res.send(webtoon)
                //         })
                //     })
            })
            .catch((e) => {
                if (e) throw e;
                // console.log(e)
                // res.send({
                //     error: true,
                //     message: errorHandler.showMessage(e)
                // });
            });
    } else {
        res.send({
            error: true,
            message: 'all field cannot be empty'
        });
    }
}

exports.updateMyWebtoon = (req, res) => {
    const { title, genre, status } = req.body;
    let image = req.file;
    if (title || genre || status || image) {
        if (image) {req.body.image = image.path}
        Webtoon.update(
            req.body,
            {
                where: { id: req.params.webtoon_id, created_by: req.params.user_id },
            })
            .then(() => {
                Webtoon.findOne({ where: { id: req.params.webtoon_id } })
                    .then(webtoons => {
                        Episode.findAll({
                            where: { created_by: req.params.user_id },
                            attributes: ['webtoon_id', [Sequelize.fn('count', Sequelize.col('webtoon_id')), 'count']],
                            group: ['episode.webtoon_id'],
                            order: Sequelize.literal('webtoon_id DESC')
                        })
                            .then(episodes => {
                                webtoons = [webtoons.dataValues]
                                webtoons.push(episodes[0].dataValues)
                                console.log(webtoons)
                                res.send(webtoons)
                            })
                            .catch(e => console.log(e));
                    })
                    .catch(e => console.log(e))
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
