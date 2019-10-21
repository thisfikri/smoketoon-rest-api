const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const Webtoon = models.webtoon;
const Favourite = models.favourite;

exports.showMyFavourites = (req, res) => {
    Favourite.findAll({
        where: {user_id: req.params.user_id},
        include: [{
            model: Webtoon,
            as: 'webtoonId'
        }]
        // {
        //     model: User,
        //     as: 'userId',
        //     attributes: ['name']
        // }]
    })
    .then(favourites =>  {
        res.send(JSON.stringify(favourites))
    })
    .catch((e) => {
        res.send({
            error: true,
            message: errorHandler.showMessage(e)
        });
    });
}

exports.showFavourites = (req, res) => {
    Favourite.findAll({
        include: [{
            model: Webtoon,
            as: 'webtoonId'
        }]
        // {
        //     model: User,
        //     as: 'userId',
        //     attributes: ['name']
        // }]
    })
    .then(favourites => res.send(favourites))
    .catch((e) => {
        res.send({
            error: true,
            message: errorHandler.showMessage(e)
        });
    });
}

exports.addMyFavourite = (req, res) => {
    if (req.params.user_id && req.params.webtoon_id) {
        Favourite.create({
            user_id: req.params.user_id,
            webtoon_id: req.params.webtoon_id
        })
        .then(result => {
            Webtoon.findOne({where: {
                id: req.params.webtoon_id
            }})
            .then(webtoons => {
                result.dataValues.webtoonId = webtoons.dataValues;
                // console.log(result)
                res.send(result)
            })
        })
        .catch((e) => {
            res.send({
                error: true,
                message: e
            });
        });
    } else {
        res.send({
            error: true,
            message: 'all field cannot be empty'
        });
    }
}

exports.deleteMyFavourite = (req , res) => {
    Favourite.destroy({
        where: {
            id: req.params.favourite_id,
            user_id: req.params.user_id,
            webtoon_id: req.params.webtoon_id
        }
    })
    .then(result => {
        if (result) {
            res.send({
                id: req.params.favourite_id
            })
        } else {
            res.send({
                error: true,
                message: 'delete favourite failed'
            });
        }
    })
    .catch((e) => {
        res.send({
            error: true,
            message: errorHandler.showMessage(e)
        });
    });
}