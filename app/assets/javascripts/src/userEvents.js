function runUser() {
  console.log('Im Running UserEvents')
  const userEvents = new UserEvents();
}                  

if (document.readyState != 'loading') runUser();

else if (document.addEventListener) document.addEventListener('DOMContentLoaded', runUser);

else document.attachEvent('onreadystatechange', function () {
  if (document.readyState == 'complete') runUser();
});


class UserEvents {
  constructor() {

    this.events = [];

    this.adapter = new EventsAdapter();
    
    this.newEventName = document.getElementById('event_name');
    this.newEventLocation = document.getElementById('event_location');
    this.newEventDescription = document.getElementById('event_description');
    this.newEventStart = document.getElementById('event_start_date');
    this.newEventEnd = document.getElementById('event_end_date');
    this.plannerId = document.getElementById('event_planner_id');
    this.idInput = document.querySelector('#id');

    this.eventsContainer = document.getElementById('output');
    this.userEventsContainer = document.getElementById('user-events');

    this.eventForm = document.querySelector('.card-form');
    this.eventForm.addEventListener('submit', this.createEvent.bind(this));

    this.getUserEvents();


    this.userEventsContainer.addEventListener('click', this.enableEdit.bind(this))


    this.userEventsContainer.addEventListener('click', this.deleteUserEvent.bind(this))

  }

  



  createEvent() {
    debugger

    const name = this.newEventName.value;
    const location = this.newEventLocation.value;
    const description = this.newEventDescription.value;
    const planner_id = this.plannerId.value;
    const start_date = this.newEventStart.value;
    const end_date = this.newEventEnd.value;
    const id = document.querySelector('#id').value;
    
    

    if(name === '' || location === '' || description === '' || start_date === '' || end_date === '') {
      debugger
      ui.showAlert('Please fill in all the fields', 'alert alert-danger' );
    } else {
      if(id === '') {
    



    this.adapter.createEvent(name, location, description, planner_id, start_date, end_date).then(event => {
      this.events.push(new Event(event))
      this.renderUserEvents()
      this.clearFields()

    })
    .catch(err => console.log(err));
  } else {
    this.adapter.updateEvent(name, location, description, planner_id, start_date, end_date, id)
    .then(data => {
      const ui = new UI();
      ui.showAlert('Event updated', 'alert alert-success');
      ui.changeFormState('add');
      getUserEvents();
    })
    .catch(err => console.log(err));
  }
    }
  }
  //  getUserEvents(){

  //    const id = this.plannerId.value;

  //    this.adapter.fetchEvents(`http://localhost:3000/users/${id}.json`)
  //    .then(events => {
  //      events.sort((a, b) => b.id - a.id).forEach(event => this.events.push(new Event(event)))
  //      console.log(this.events)
  //    })
  //    .then(() => {
  //      this.renderUserEvents()
  //    })
  //    .catch(err => console.log(err));
  //   }

  getUserEvents() {
    const id = this.plannerId.value;
    this.adapter.fetchEvents(`http://localhost:3000/users/${id}.json`)
      .then(function (data) {
        console.log(data)
        data.map(event => {
          const newEvent = new Event(event)
          const newEventHtml = newEvent.renderEvents()
          document.getElementById('user-events').innerHTML += newEventHtml
        })

      })
      .catch(err => console.log(err))
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
  
    if (e.target.parentElement.classList.contains('edit')) {
      //  debugger
      const id = e.target.parentElement.dataset.id;
      const end_date = e.target.parentElement.previousElementSibling.textContent;
      const start_date = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const description = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
      const location = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
      const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
      const planner_id = this.plannerId.value;
      

      const data = {
        id: id,
        name: name,
        description: description,
        location: location,
        planner_id: planner_id,
        start_date: start_date,
        end_date: end_date
        
      }
      this.fillForm(data);
    }
    e.preventDefault();
  }

  fillForm(data) {
    // debugger
    this.newEventName.value = data.name;
    this.newEventStart.value = data.start_date;
    this.newEventEnd.value = data.end_date;
    this.newEventLocation.value = data.location;
    this.newEventDescription.value = data.description;
    this.idInput = data.id;

    const ui = new UI();

    ui.changeFormState('edit');
  }







  deleteUserEvent(e) {
    
    if (e.target.parentElement.classList.contains('delete')) {

      const id = e.target.parentElement.dataset.id;

      if (confirm('Are you sure?')) {
        this.adapter.deleteEvent(`http://localhost:3000/events/${id}`)
          .then(() => {
            // debugger
            this.renderUserEvents();
            // this.getUserEvents()
            console.log('deleted item');
          })
          // .then(() => {
  
          //   this.getUserEvents()
          }
      }
     e.preventDefault();
    }


  }

