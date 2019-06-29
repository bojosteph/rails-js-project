


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

    //Delete events
    this.userEventsContainer.addEventListener('click', this.deleteUserEvent.bind(this))
    

 
  
    
  }

  getEvents() {
   this.adapter.fetchEvents('http://localhost:3000/events.json')
   .then(function (data) {
     console.log(data)
     data.map(event => {
       const newEvent = new Event(event)
       const newEventHtml = newEvent.renderEvents()
       document.getElementById('output').innerHTML += newEventHtml  
     })
     
   })
   .catch(err => console.log(err))
   }
        

   createEvent(e) {
    
     const name = this.newEventName.value;
     const location = this.newEventLocation.value;
     const description = this.newEventDescription.value;
     const planner_id = this.plannerId.value;
     const start_date = this.newEventStart.value;
     const end_date = this.newEventEnd.value;


     this.adapter.createEvent(name, location, description, planner_id, start_date, end_date).then(event => {
       this.events.push(new Event(event))
       this.renderUserEvents()
       this.clearFields()
       
     })
     e.preventDefault();
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

    deleteUserEvent(e) {
      e.preventDefault();
      if(e.target.parentElement.classList.contains('delete')){
        
        const id = e.target.parentElement.dataset.id;
        
        if(confirm('Are you sure?')) {
           this.adapter.deleteEvent(`http://localhost:3000/events/${id}`)
            .then(() => {
              // debugger
               console.log('deleted item');
              // this.getUserEvents()
            })
          .then(() => {
        
            this.renderUserEvents()
          })
          }
          
        }
       
       
    }

   }







  
