const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,  '../templates/views')
const partialsPath = path.join(__dirname,  '../templates/partials')

// Setup handlebards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Bruno Bacelar'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Bruno Bacelar'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Help message page',
    name: 'Bruno Bacelar'
  })
})

app.get('/weather', (req, res) => {
  if ((!req.query.address)) {
    return res.send({
      error: 'You must provide an address.'
    })
  }

   geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
    if (error) {
      return res.send({ error })
    } else {
      forecast(latitude,longitude, (error, data) => {
        if (error) {
          return res.send({ error })
        } 
        const {description, temperature, feelslike, weather_icons} = data
        
        return res.send({ 
                forecast: `${description}. Current temperature is ${temperature} degrees and it feels like ${feelslike} degrees `,
                location: location,
                temperature,
                feelslike,
                weather_icons
              })
      })
    }
  })

})

app.get('/products', (req, res) => {
  if ((!req.query.search)) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  res.send({ 
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: 'Help article not found.',
    name: 'Bruno Bacelar'

  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: 'Page Not Found.',
    name: 'Bruno Bacelar'

  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  
})