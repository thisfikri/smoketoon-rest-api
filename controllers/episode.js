const models = require('../models');
const Episode = models.episode;
const Image = models.image;
const errorHandler = require('../handlers/errorHandler');


exports.showWebtoonEpisodes = (req, res) => {
Episode.findAll({
        where: {
            webtoon_id: req.params.webtoon_id
        },
        order: [
            ['id', 'DESC']
        ]
        // include: [{
        //     model: Webtoon,
        //     as: 'webtoonId'
        // }]
    })
    .then(episodes => res.send(episodes))
    // .catch((e) => {
    //     if (e) throw e;
    // });
}

exports.showWebtoonEpisodeLastID = (req, res) => {
    Episode.findAll({
        attributes: ['id'],
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })    
    .then(episodes => {
        res.send(episodes)
    })
    // .catch(e => {
    //     if (e) throw e;
    // })
}

exports.showWebtoonEpisodePages = (req, res) => {
    Episode.findOne({
        where: {webtoon_id: req.params.webtoon_id}
    }).then((episode) => {
        Image.findAll({
            where: {
                id_episode: req.params.episode_id
            },
            // include: [{
            //     model: Episode,
            //     as: 'episodeId'
            // }]
        })
        .then(images => res.send(images))
        // .catch((e) => {
        //     res.send({
        //         error: true,
        //         message: errorHandler.showMessage(e)
        //     });
        // });
    })
    // .catch((e) => {
    //     res.send({
    //         error: true,
    //         message: errorHandler.showMessage(e)
    //     });
    // });
}

exports.createEpisode = (req, res) => {
    const {image, title} = req.body;
    console.log(req.body)
    if (title && image) {
        Episode.create({
            webtoon_id: req.params.webtoon_id,
            created_by: req.params.user_id,
            title,
            image
        })
        .then(episode => {
            req.body.pages.map(o => {
                o.id_episode = episode.id;
                return o;
            });

            Image.bulkCreate(req.body.pages)
            .then(images => {
                res.send(episode)
            })
            // .catch(e => {
            //     console.log(e)
            // })
        })
        // .catch((e) => {
        //     console.log(e)
        // });
    } else {
        res.send({
            error: true,
            message: 'all field cannot be empty'
        });
    }
}

exports.updateEpisode = (req, res) => {
    const {image, title} = req.body;
    
    if (title || image) {
        Episode.update({
            title,
            image
        },
        {
            where: {id: req.params.episode_id}
        })
        .then(() => {
            Episode.findOne({where: {id: req.params.episode_id}})
            .then(episode => {
                console.log(episode)
                res.send(episode)
            })
            .catch(e => console.log(e))
        })
        // .catch((e) => {
        //     console.log(e)
        // });
    } else {
        console.log('Error')
    }
}

exports.deleteEpisode = (req, res) => {
    // const {episode_id} = req.params;
    // console.log(req.params)
    Episode.destroy({where: {id: req.params.episode_id}})
    .then(result =>  {
        if (result) {
            res.send({
                id: req.params.episode_id
            })
        } else {
            res.send({
                error: true,
                message: 'delete webtoon failed'
            });
        }
    })
    // .catch((e) => {
    //     res.send({
    //         error: true,
    //         message: errorHandler.showMessage(e)
    //     });
    // });
}