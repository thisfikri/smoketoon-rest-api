const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const Webtoon = models.webtoon;
const Favourite = models.favourite;

const showMyFavourites = (req, res) => {
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
    .then(favourites => res.send(favourites))
    .catch((e) => {
        res.send({
            error: true,
            message: errorHandler.showMessage(e)
        });
    });
}

const showFavourites = (req, res) => {
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

const addMyFavourite = (req, res) => {
    if (req.params.user_id && req.params.webtoon_id) {
        Favourite.create({
            user_id: req.params.user_id,
            webtoon_id: req.params.webtoon_id
        })
        .then(result => res.send(result))
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

const deleteMyFavourite = (req , res) => {
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

module.exports = {
    showMyFavourites,
    showFavourites,
    addMyFavourite,
    deleteMyFavourite
}