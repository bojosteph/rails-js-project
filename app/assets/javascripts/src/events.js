


document.addEventListener("DOMContentLoaded", function () {
  console.log('Loading events.js .....')
  const events = new Events();
  
});


class Events {
  constructor() {
    this.events = []
    this.adapter = new EventsAdapter()
    this.getEvents()
    this.newEventName = document.getElementById('event_name')
    this.newEventLocation = document.getElementById('event_location')
    this.newEventDescription = document.getElementById('event_description')
    this.newEventStart = document.getElementById('event_start_date')
    this.newEventEnd = document.getElementById('event_end_date')
    this.plannerId = document.getElementById('event_planner_id')
    this.eventsContainer = document.getElementById('user-events')
    this.eventForm = document.querySelector('.card-form')
    this.eventForm.addEventListener('submit', this.createEvent.bind(this))
    // this.showUserEvents = document.getElementById('event-button')
    this.getUserEvents()
  
    
  
    
  }

  getEvents() {
   this.adapter.fetchEvents('http://localhost:3000/events.json')
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

   createEvent(e) {
     e.preventDefault()

     const name = this.newEventName.value;
     const location = this.newEventLocation.value;
     const description = this.newEventDescription.value;
     const planner_id = this.plannerId.value;
     const start_date = this.newEventStart.value;
     const end_date = this.newEventEnd.value;


     this.adapter.createEvent(name, location, description, planner_id, start_date, end_date).then(event => {
       this.events.push(new Event(event))
       this.render()
     })
   }
   render() {
     this.eventsContainer.innerHTML = this.events.map(event => event.renderEvents()).join('')
   }
   getUserEvents(){
  
     const id = this.plannerId.value;
     this.adapter.fetchEvents(`http://localhost:3000/users/${id}.json`)
       .then(data => {
         console.log(data);
         data.map(event => {
           const newEvent = new Event(event)
           const newEventHtml = newEvent.renderEvents()
           document.getElementById('user-events').innerHTML += newEventHtml
         })
       })
       .catch(err => console.log(err));
      }

   }







  
