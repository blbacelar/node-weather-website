const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weather_icon = document.querySelector('#icon')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  messageOne.textContent = 'Loading ...'
  messageTwo.textContent = ''
  const location = search.value
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
  response.json ().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error
      console.log(data.error);

    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
      weather_icon.src = data.weather_icons
      console.log(data.location);
      console.log(data.forecast);
    }
  })
})
  
})