const request = require('postman-request');

const geocode = (address = 'Langley', callback) => {

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmxiYWNlbGFyIiwiYSI6ImNrYmw5MG5oMzE0NTgycm5ja3Azd3ZsZG4ifQ.E9i-Nu8Wng7tfGV1l5YtTw&limit=1`


  request({ url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location service', undefined)
    } else if (body.message) {
      callback('Unable to find location. Try another search.', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const features = body.features[0]
      callback(undefined, {latitude: features.center[1], longitude: features.center[0], location: features.place_name})
    }
  })
}

module.exports = geocode