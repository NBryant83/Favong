// Required Modules and Variables
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const morgan = require('morgan')
const cryptojs = require('crypto-js')


// Middleware and Config
require('dotenv').config()
const API_KEY = process.env.API_KEY
const app = express()
const rowdyRes = rowdy.begin(app)
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(require('morgan')('dev'))

// Controllers
// app.use('/users', require('./controllers/usersController'))
// app.use('/auth', require('./controllers/authController'))


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