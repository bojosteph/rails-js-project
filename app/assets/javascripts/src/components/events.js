document.addEventListener("DOMContentLoaded", function (event) {
  console.log('Im From   Events Index Page')
  const events = new Events()

});


class Events {
  constructor() {
    this.adapter = new EventsAdapter()
    this.getEvents()

    this.eventsContainer = document.getElementById('output')


  }

  getEvents(e) {
    // e.preventDefault();
    this.adapter.fetchEvents('http://localhost:3000/events')
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        data.map(event => {
          const newEvent = new Event(event)
          const newEventHtml = newEvent.renderEvents()
          document.getElementById('output').innerHTML += newEventHtml
        })
      })
      .catch(err => console.log(err))
  }

}