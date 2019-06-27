// import { http } from './http';

$(function(){
  console.log('events.js is loaded....')
  listenForClick()

});

function listenForClick() {
  $('button#button2').on('click', function(e){
    e.preventDefault()
    getEvents()
  })
}

function getEvents() {
  fetch('http://localhost:3000/events.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let output = '';
    data.forEach(function(event){
      output += `<li>${event.name}</li>`;
    });
    document.getElementById('output').innerHTML = output;
  })
  .catch(err => console.log(err));
  
}