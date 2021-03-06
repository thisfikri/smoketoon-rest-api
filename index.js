const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer');
require('express-group-routes');

const app = express();
const port = 5320;

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))

// controllers
const UserController = require('./controllers/user');
const WebtoonController = require('./controllers/webtoon');
const FavouriteController = require('./controllers/favourite');
const EpisodeController = require('./controllers/episode');
const ImageController = require('./controllers/image');

// middleware
const { authenticated } = require('./middleware');
const { upload } = require('./uploads')

// --------------- Upload ------------------ //
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Smoketoon API')
})

app.group('/api/v1/', (router) => {
    // router.post('/testupload', upload.array('pageImages'), (req, res) => {
    //     res.send(req.files);
    // })

    // --------------- User ------------------ //
    router.post('/register', UserController.register);
    router.post('/login', UserController.login);
    router.get('/user/:user_id/profile', authenticated, UserController.showProfileData);
    router.post('/user/:user_id/profile', authenticated, upload.single('profileImage'), UserController.updateProfileData);


    // --------------- Webtoon ------------------ //
    router.get('/webtoons', authenticated, WebtoonController.index);
    router.get('/webtoons/choices', authenticated, WebtoonController.showChoicesWebtoons);
    router.get('/webtoons/popular', authenticated, WebtoonController.showPolpularWebtoons);
    router.get('/user/:user_id/webtoons', authenticated, WebtoonController.showMyWebtoons);
    router.post('/user/:user_id/webtoon', authenticated, upload.single('banner'), WebtoonController.createMyWebtoon);
    router.put('/user/:user_id/webtoon/:webtoon_id', authenticated, upload.single('banner'), WebtoonController.updateMyWebtoon);
    router.delete('/user/:user_id/webtoon/:webtoon_id', authenticated, WebtoonController.deleteMyWebtoon);

    // ----------------- Favourite -------------- //
    router.get('/user/:user_id/webtoons/favourite', authenticated, FavouriteController.showMyFavourites);
    router.get('/webtoon/:title', authenticated, WebtoonController.showWebtoon);
    router.post('/user/:user_id/webtoon/:webtoon_id/favourite', authenticated, FavouriteController.addMyFavourite);
    router.delete('/user/:user_id/webtoon/:webtoon_id/favourite/:favourite_id', authenticated, FavouriteController.deleteMyFavourite);    
    // router.get('/webtoons/favourite', authenticated, FavouriteController.showFavourites);



    // ------------- EPISODE ---------------//
    router.get('/webtoon/:webtoon_id/episodes', authenticated, EpisodeController.showWebtoonEpisodes);
    router.get('/webtoon/episode/id', authenticated, EpisodeController.showWebtoonEpisodeLastID);
    router.post('/user/:user_id/webtoon/:webtoon_id/episode', authenticated, upload.array('pageImages', 10), EpisodeController.createEpisode);
    router.put('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.updateEpisode);
    router.delete('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.deleteEpisode);
    router.get('/webtoon/:webtoon_id/episode/:episode_id', authenticated, EpisodeController.showWebtoonEpisodePages);
    


    // ------------- IMAGE ---------------//
    router.post('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image', authenticated, upload.single('pageImage'), ImageController.createImage);
    router.delete('/user/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', authenticated, ImageController.deleteImage);
});

app.listen(process.env.PORT||9876, () => console.log(`Listen on Port 9876`));
