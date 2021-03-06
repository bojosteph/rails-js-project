document.addEventListener("DOMContentLoaded", function (event) {
  console.log('Im From User Events')
  const userEvents = new UserEvents();

});



class UserEvents {
  constructor() {
    this.events = [];
    this.adapter = new EventsAdapter();

    this.searchForm = document.getElementById('search-event')
    this.calendar = document.getElementById('events-calendar')
    this.hideButton = document.getElementById('hide')
    this.newEventName = document.getElementById('event_name');
    this.newEventLocation = document.getElementById('event_location');
    this.newEventDescription = document.getElementById('event_description');
    this.newEventStart = document.getElementById('event_start_date');
    this.newEventEnd = document.getElementById('event_end_date');
    this.plannerId = document.getElementById('event_planner_id');
    this.idInput = document.querySelector('#id');
    this.eventsContainer = document.getElementById('output');
    this.userEventsContainer = document.getElementById('user-events');
    this.eventForm = document.querySelector('.event-submit');  
    this.editButton = document.querySelector('.event-edit')

    this.searchForm.addEventListener('keyup', this.searchEvent.bind(this))
    this.eventForm.addEventListener('click', this.createEvent.bind(this));   
    this.userEventsContainer.addEventListener('click', this.enableEdit.bind(this))
    this.editButton.addEventListener('click', this.editEvent.bind(this))
    this.userEventsContainer.addEventListener('click', this.deleteUserEvent.bind(this))
    this.hideButton.addEventListener('click', this.hideCalendar.bind(this))
    


    this.getUserEvents();
  }

  createEvent(e) {
    // debugger
    e.preventDefault()
    const name = this.newEventName.value;
    const location = this.newEventLocation.value;
    const description = this.newEventDescription.value;
    const planner_id = this.plannerId.value;
    const start_date = this.newEventStart.value;
    const end_date = this.newEventEnd.value;
    const id = document.querySelector('#id').value;

    this.adapter.createEvent(name, location, description, planner_id, start_date, end_date).then(event => {
        console.log('Request succeeded with CreateEvent response', event);
        this.events.push(new Event(event))
        this.clearFields()
        this.renderUserEvents();
      })
      .catch(err => console.log('There is error', err));
  }

  getUserEvents() {
    const id = this.plannerId.value;
    this.adapter.fetchEvents(`http://localhost:3000/users/${id}/events`)
      .then(events => {
        events.sort((a, b) => b.id - a.id).forEach(event => this.events.push(new Event(event)))
        console.log('Request succeeded with getUserEvents ',
          this.events)
      })
      .then(() => {
        this.renderUserEvents()
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

    this.newEventName.value = data.name;
    this.newEventStart.value = data.start_date;
    this.newEventEnd.value = data.end_date;
    this.newEventLocation.value = data.location;
    this.newEventDescription.value = data.description;
    this.idInput.value = data.id;

  }


  deleteUserEvent(e) {

    if (e.target.parentElement.classList.contains('delete')) {

      const id = e.target.parentElement.dataset.id;
      e.target.parentElement.parentElement.remove();

      if (confirm('Are you sure?')) {
        this.adapter.deleteEvent(`http://localhost:3000/events/${id}`)
          .then(() => {


            console.log('deleted item');
            this.events = [];
            this.getUserEvents();
          })
          .catch(err => console.log(err));
      }
    }

  }

  editEvent(e) {
    e.preventDefault();

    const name = this.newEventName.value;
    const location = this.newEventLocation.value;
    const description = this.newEventDescription.value;
    const planner_id = this.plannerId.value;
    const start_date = this.newEventStart.value;
    const end_date = this.newEventEnd.value;
    const id = document.querySelector('#id').value;

    this.adapter.updateEvent(name, location, description, planner_id, start_date, end_date, id)
      .then(data => {
        console.log('updated event', data)
        this.clearFields()
        this.events = []
        this.getUserEvents()
      })
      .catch(err => console.log(err))
  }

  hideCalendar(e) {
    e.preventDefault();
    const cal = this.calendar;
    if(cal.style.display === "none") {
      cal.style.display = "block";
    } else {
      cal.style.display = "none";
    }
  }

  searchEvent(e) {
      e.preventDefault()
      const searchInput = this.searchForm.value
      const filteredEvents = this.events.filter(event => event.name.toLowerCase().includes(searchInput.toLowerCase()))
      this.userEventsContainer.innerHTML = filteredEvents.map(event => event.renderEvents()).join('')
    }
  }
 


