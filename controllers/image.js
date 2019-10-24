const models = require('../models');
const Image = models.image;
const errorHandler = require('../handlers/errorHandler');

exports.createImage = (req, res) => {
    const {page, image} = req.body;
    console.log(req.body, req.params)
    if (req.params.episode_id && req.params.webtoon_id && req.params.user_id) {
        Image.create({
            id_episode: req.params.episode_id,
            webtoon_id: req.params.webtoon_id,
            created_by: req.params.user_id,
            page,
            image
        })
        .then(image => {
            res.send(image)
        })
        .catch((e) => {
           console.log(e)
        });
    } else {
        res.send({
            error: true,
            message: 'all field cannot be empty'
        });
    }
}

exports.deleteImage = (req, res) => {
    const {image_id} = req.params;
    Image.destroy({where: {id: image_id }})
    .then(result => {
        if (result) {
            res.send({
                id: image_id
            })
        } else {
            res.send({
                error: true,
                message: 'delete image failed'
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