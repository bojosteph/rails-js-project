document.addEventListener("DOMContentLoaded", function (event) {
  console.log('calendar')
  const calendar = new Calendar();
});


class Calendar {
  constructor() {
    this.adapter = new EventsAdapter();

    
    this.eventShow = document.getElementById('myModal')
    this.eventsIndexModal = document.getElementsByClassName('.events-modal')
    
    this.calendarBody = document.querySelector('.events-calendar')
    this.calendarBody.addEventListener('click', this.showCalendarEvent.bind(this))
    // this.showEventModal = this.eventModal.showModal.bind(this);
  }

  showCalendarEvent(e) {
 
    console.log("clicked")
      
            
      debugger
      const id = e.target.firstElementChild.dataset.id

    this.adapter.fetchEvents(`http://localhost:3000/events/${id}`)

      .then(data => {
        console.log(data)
        const indexEvent = new Event(data)
        const indexEventHtml = indexEvent.renderModal()
        this.eventsIndexModal.innerHTML = indexEventHtml
        
        modal.style.display = 'block';

      })
    // return false;
  }

  modalClickEvent(e) {
    
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("event-date");
    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
      modal.style.display = "block";
    }
    span.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }
}