const models = require('../models');
const Image = models.image;

const createImage = (req, res) => {
    const {title, image} = req.body;
    if (req.params.episode_id && req.params.webtoon_id && req.params.user_id) {
        Image.create({
            id_episode: req.params.episode_id,
            webtoon_id: req.params.webtoon_id,
            created_by: req.params.user_id,
            title,
            image
        })
        .then(image => res.send(image))
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

const deleteImage = (req, res) => {
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

module.exports = {
    createImage,
    deleteImage
}