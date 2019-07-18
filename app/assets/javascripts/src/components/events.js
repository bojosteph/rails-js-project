document.addEventListener("DOMContentLoaded", function (event) {
  console.log('Im From   Events Index Page')
  const events = new Events()

});


class Events {
  constructor() {
    this.adapter = new EventsAdapter()
    this.getEvents()

    this.eventsContainer = document.getElementById('output')
    // this.searchForm = document.getElementById('search_button')
    // this.searchForm.addEventListener('click', this.searchEvents.bind(this))


  }

  getEvents(e) {
    // e.preventDefault();
    this.adapter.fetchEvents('http://localhost:3000/events')
      .then(function(data) {
        console.log('Request succeeded with JSON response', data);
        data.map(event => {
          const newEvent = new Event(event)
          const newEventHtml = newEvent.renderEvents()
          document.getElementById('output').innerHTML += newEventHtml
        })
      })
      .catch(err => console.log(err))
  }

  // searchEvents(e) {
  //   e.preventDefault();
  //   // debugger
  //   const searchInput = e.target.previousElementSibling.value;
  //   this.adapter.fetchEvents(`http://localhost:3000/events?utf8=%E2%9C%93&search=${searchInput}&commit=Search`)
  //   .then(function(data){
  //     console.log(data)
  //     data.map(event => {
  //       const searchEvent = new Event(event)
  //       const searchEventHtml = searchEvent.renderEvents()
  //       document.getElementById('output').innerHTML += searchEventHtml
  //     })
  //   })
  //  .catch(err => console.log(err))
  // }

}