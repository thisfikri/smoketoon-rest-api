const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('./public/uploads')) {
            if (fs.mkdirSync('./public/uploads')) {
                if (!fs.existsSync('./public/uploads/profile')) {
                    if (fs.mkdirSync('./public/uploads/profile')) {
                        console.log('profile folder created')
                    }
                }

                if (!fs.existsSync('./public/uploads/webtoons')) {
                    if (fs.mkdirSync('./public/uploads/webtoons')) {
                        console.log('webtoons folder created')
                    }
                }
            }
        } else {
            if (!fs.existsSync('./public/uploads/profile')) {
                if (fs.mkdirSync('./public/uploads/profile')) {
                    console.log('profile folder created')
                }
            }

            if (!fs.existsSync('./public/uploads/webtoons')) {
                if (fs.mkdirSync('./public/uploads/webtoons')) {
                    console.log('webtoons folder created')
                }
            }

            if (!fs.existsSync('./public/uploads/webtoons/banners')) {
                if (fs.mkdirSync('./public/uploads/webtoons/banners')) {
                    console.log('banners folder created')
                }
            }

            if (!fs.existsSync('./public/uploads/webtoons/pages')) {
                if (fs.mkdirSync('./public/uploads/webtoons/pages')) {
                    console.log('webtoons folder created')
                }
            }
        }

        switch (file.fieldname) {
            case 'profileImage':
                cb(null, './public/uploads/profile');
                break;
            case 'banner':
                cb(null, './public/uploads/webtoons/banners');
                break;
            case 'pageImages':
                cb(null, './public/uploads/webtoons/pages');
                break;
            case 'pageImage':
                cb(null, './public/uploads/webtoons/pages');
                break;
            default:
                if (!fs.existsSync('./public/uploads/tmp')) {
                    if (fs.mkdirSync('./public/uploads/tmp')) {
                        console.log('tmp folder created')
                    }
                }
                cb(null, './public/uploads/tmp')
                break;
        }
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        console.log(req.body)
        switch (file.fieldname) {
            case 'profileImage':
                // if (fs.existsSync(`${req.body.prevPic}`)) {
                //     fs.unlink(`${req.body.prevPic}`, (err) => {
                //         if (err) throw err
                //     })
                // }
                fileName = `-profile-${req.body.name}.${file.mimetype.split('/')[1]}`;
                break;
            case 'banner':
                // if (fs.existsSync(`${req.body.prevPic}`)) {
                //     fs.unlink(`${req.body.prevPic}`, (err) => {
                //         if (err) throw err
                //     })
                // }
                fileName = `-banner-${req.body.title}.${file.mimetype.split('/')[1]}`;
                break;
            case 'pageImages':
                // if (fs.existsSync(`${req.body.prevPic}`)) {
                //     fs.unlink(`${req.body.prevPic}`, (err) => {
                //         if (err) throw err
                //     })
                // }
                fileName = `-pages-${req.body.title}.${file.mimetype.split('/')[1]}`;
                break;
            case 'pageImage':
                // if (fs.existsSync(`${req.body.prevPic}`)) {
                //     fs.unlink(`${req.body.prevPic}`, (err) => {
                //         if (err) throw err
                //     })
                // }
                fileName = `-pages-${req.body.title}.${file.mimetype.split('/')[1]}`;
                break;
            default:
                break;
        }
        cb(null, new Date().toISOString().replace(/:/g, '-') + fileName)
    }
})

exports.upload = multer({ storage })