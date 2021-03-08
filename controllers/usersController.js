const db = require('../models')
const router = require('express').Router()
const AES = require('crypto-js/aes')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')

router.get('/', (req, res) => {
    try {


        res.render('users/profile')
    } catch (error) {
        console.log(error)
    }
})


router.get('/edit', async(req, res) => {
    try {
        db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            .then((user) => {
                console.log("🎉", user.dataValues.id)
                res.render('users/edit', { user: user })
            })
    } catch (error) {
        console.log(error)
    }
})

router.put('/edit/:id', async(req, res) => {
    try {
        db.user.update({ username: req.body.newName }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/profile')
    } catch (error) {
        console.log(error)
    }
})


// find all artists in db associated w/user user-res.locals
router.get('/profile', async(req, res) => {
    try {
        const artist = await db.artist.findAll({
                // where: {
                //     usersId: res.locals.user.id
                // }
                include: [db.user]
            })
            .then(artists => {
                console.log(artists)
                res.render('users/profile', { artists: artists })

            })
        console.log(res.locals.user)
    } catch (error) {
        console.log(error)
    }
})


router.post('/profile', async(req, res) => {
    try {
        // create artist in db, associate w/current user artist-req.body, user-res.locals
        const artist = await db.artist.create({
            strArtist: req.body.artist
        })
        console.log(req.body)
        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})


router.post('/new', (req, res) => {
    try {

        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})


// // Edit fav
// router.put('/profile/:id', (req, res) => {
//     try {
//         const editFav =
//             res.redirect('/profile')
//     } catch (error) {
//         console.log(error)
//     }
// })

// Delete fav
router.delete('/profile/:id', async(req, res) => {
    try {
        const deleteFav = await db.artist.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('back')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router