// Required Modules and Variables
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const cryptojs = require('crypto-js')
const db = require('./models')
const methodOverride = require('method-override')


// Middleware and Config
require('dotenv').config()

const API_KEY = process.env.API_KEY
const app = express()
const rowdyRes = rowdy.begin(app)
const PORT = process.env.PORT || 8000;

app.use(methodOverride('_method'))
app.use(require('cookie-parser')())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(require('morgan')('dev'))

app.use(async(req, res, next) => {
    if (req.cookies.username) {
        const decryptedId = cryptojs.AES.decrypt(req.cookies.username, process.env.ENCRYPTION_KEY).toString(cryptojs.enc.Utf8)
        console.log(decryptedId);
        const user = await db.user.findOne({
            where: {
                id: decryptedId
            }
        })
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    next()
})

// Controllers

app.use('/users', require('./controllers/usersController'))
app.use('/auth', require('./controllers/authController'))


// Routes

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/searchResults', async(req, res) => {
    try {
        // console.log(req.query.searchBar)
        // const trackName = `https://www.theaudiodb.com/api/v1/json/${API_KEY}/searchtrack.php?s=${req.query.searchBar}&t=${req.query.searchBar}`
        const artistName = `https://www.theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=${req.query.searchBar}`
        const results = await axios.get(artistName)
        const apiResponse = results.data.artists
        res.render('searchResults', { artists: apiResponse })
            // res.json({ apiResponse })

    } catch (error) {
        console.log(error)
    }
})

// app.get('/:id', async(req, res) => {
//     try {

//     } catch (error) {
//         console.log(error)
//     }
// })





// app.get('/', async(req, res) => {
//     try {
//         // need to save search query as whatever user searches, not coldplay
//         // const searchTerm =
//         const artistName = `theaudiodb.com /api/v1/json/${API_KEY}/search.php?s=coldplay`
//     } catch (error) {
//         console.log(error)
//     }
// })







// Server
app.listen(PORT, () => {
    console.log('The server has started! ╰(*°▽°*)╯')
    rowdyRes.print()
})