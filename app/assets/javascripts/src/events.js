// import { http } from './http';

document.addEventListener("DOMContentLoaded", function () {
  console.log('Loading events.js .....')
  getEvents()
  
});



function getEvents() {
  fetch('http://localhost:3000/events.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    data.map(event => {
      const newEvent = new Event(event)
      const newEventHtml = newEvent.renderEvents()
      document.getElementById('output').innerHTML += newEventHtml
    })

  })
    .catch(err => console.log(err));
}

