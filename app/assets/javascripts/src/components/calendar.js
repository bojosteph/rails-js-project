document.addEventListener("DOMContentLoaded", function (event) {
  console.log('calendar')
  const calendar = new Calendar();

});


class Calendar {
  constructor() {
    this.adapter = new EventsAdapter();


    this.eventShow = document.getElementById('myModal')
    this.eventsIndexModal = document.getElementById('events-modal')

    this.calendarBody = document.querySelector('.events-calendar')
    this.calendarBody.addEventListener('click', this.showCalendarEvent.bind(this))
    // this.showEventModal = this.eventModal.showModal.bind(this);
  }

  showCalendarEvent(e) {

    console.log("clicked")



    const id = e.target.dataset.id

    this.adapter.fetchEvents(`http://localhost:3000/events/${id}`)

      .then(data => {
        console.log(data)
        const indexEvent = new Event(data)
        const indexEventHtml = indexEvent.renderModal()
        this.eventsIndexModal.innerHTML = indexEventHtml

        this.modalClickEvent()


      })
      .catch(err => console.log(err))
  }



  modalClickEvent(e) {

    let modal = document.getElementById("myModal");
    let btn = document.getElementById("myBtn");
    let span = document.getElementsByClassName("close")[0];

  
      modal.style.display = "block";

    
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