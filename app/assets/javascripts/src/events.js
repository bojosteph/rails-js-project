


document.addEventListener("DOMContentLoaded", function () {
  console.log('Loading events.js .....')
  const events = new Events();
  
});


class Events {
  constructor() {
    this.events = []
    this.adapter = new EventsAdapter()
    // Show index page for events on DOMContentLoaded
    this.getEvents()
    // For form input
    this.newEventName = document.getElementById('event_name')
    this.newEventLocation = document.getElementById('event_location')
    this.newEventDescription = document.getElementById('event_description')
    this.newEventStart = document.getElementById('event_start_date')
    this.newEventEnd = document.getElementById('event_end_date')
    this.plannerId = document.getElementById('event_planner_id')

    this.eventsContainer = document.getElementById('output')
    this.userEventsContainer = document.getElementById('user-events')
    // For create events
    this.eventForm = document.querySelector('.card-form')
    this.eventForm.addEventListener('submit', this.createEvent.bind(this))
    //Show user show page on DOMContentLoaded
    this.getUserEvents()
    // Edit user events
    
    this.userEventsContainer.addEventListener('click', this.enableEdit.bind(this))

 
  
    
  }

  getEvents() {
   this.adapter.fetchEvents('http://localhost:3000/events.json')
   .then(events => {
     events.sort((a, b) => a.id - b.id).forEach(event => this.events.push(new Event(event)))
       console.log(this.events)
   })
   .then(() => {
     this.render()
   })    
     .catch(err => console.log(err));
   }

   render() {
     this.eventsContainer.innerHTML = this.events.map(event => event.renderEvents()).join('')
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
       this.clearFields()
       this.renderUserEvents()
     })
   }
   
   getUserEvents(){
  
     const id = this.plannerId.value;

     this.adapter.fetchEvents(`http://localhost:3000/users/${id}.json`)
     .then(events => {
       events.sort((a, b) => b.id - a.id).forEach(event => this.events.push(new Event(event)))
       console.log(this.events)
     })
     .then(() => {
       this.renderUserEvents()
     })
     .catch(err => console.log(err));
    }

    renderUserEvents() {
      this.userEventsContainer.innerHTML = this.events.map(event => event.renderEvents()).join('')
    }
     

    clearFields() {
      this.newEventName.value = '';
      this.newEventLocation.value = '';
      this.newEventDescription.value = '';
      this.newEventStart.value = '';
      this.newEventEnd.value = '';
    }

    enableEdit(e) {
      if(e.target.parentElement.classList.contains('edit')) {
        console.log('Clicked')
      }
    }

   }







  
