const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//we are looking for starting from src directory because that's where the app.js file is.

//Define paths for Express config
const pubicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to serve.
app.use(express.static(pubicDirPath));
const port = process.env.PORT || 3000;

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Index Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jag Barpagga'
    })  // no need for extention
})

//About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jag Barpagga'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is a help page',
        name: 'Jag Barpagga'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send(
            {
                Error: 'Address must be valid'
            }
        )
    }
    else {
        geocode(req.query.address, (error, { latitude, longitude, location }) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                else {
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        }
        )
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Jag Barpagga'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Jag Barpagga'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})