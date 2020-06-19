const request = require('postman-request');

const forecast = (latitude, longitute, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=792b94feb43b7fe7828b2db3205352e0&query=${latitude},${longitute}`
  
  console.log(url);
  

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const current = body.current
      callback(undefined,{ description: current.weather_descriptions[0], temperature: current.temperature, feelslike: current.feelslike, weather_icons: current.weather_icons[0]})
    }
  })
}

module.exports = forecast