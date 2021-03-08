const db = require('../models')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const AES = require('crypto-js/aes')

// login page
router.get('/login', (req, res) => {
    try {
        res.render('auth/login', { errors: null })

    } catch (error) {
        console.log(error)
    }
})

// logout page
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('username')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

// signup/new page
router.get('/new', (req, res) => {
    try {
        res.render('auth/new.ejs', { errors: null })
    } catch (error) {
        console.log(error)
    }
})

// create user
router.post('/new', async(req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 11)
    try {
        if (!req.body.username || !req.body.password) {
            res.render('auth/new', { errors: 'Incorrect username and/or password' })
            return;
        }
        const user = await db.user.create({
            username: req.body.username,
            password: hashedPassword
        })

        console.log(res.locals.user)

        const encryptedId = AES.encrypt(user.id.toString(), process.env.ENCRYPTION_KEY).toString()
        res.cookie('username', encryptedId)
        res.redirect('/users/profile')

    } catch (error) {
        console.log(error)
        res.render(('auth/new', { errors: 'Something went wrong, please try again.' }))
    }
})

router.post('/login', async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 11)
        const user = await db.user.findOne({
            where: { username: req.body.username }

        })

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = AES.encrypt(user.id.toString(), process.env.ENCRYPTION_KEY).toString()
            res.cookie('username', encryptedId)
            res.redirect('/users/profile')
        } else {
            res.render('auth/login', { errors: 'Invalid email and/or password' })
        }
    } catch (error) {
        console.log(error)
        res.render('auth/login', { errors: 'Invalid email and/or password' })
    }
})








module.exports = router