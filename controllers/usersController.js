const db = require('../models')
const router = require('express').Router
const AES = require('crypto-js/aes')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    try {


        res.render('users/profile')
    } catch (error) {
        console.log(error)
    }
})

router.get('/profile', (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
})



router.post('/signup', (req, res) => {
    try {

        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})



module.exports = router