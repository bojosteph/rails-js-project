class Events {
  constructor() {
    this.reviews = []
    this.rsvps = []

    this.adapter = new EventsAdapter()

    this.getEvents()
    this.getEvent()
    this.getReviews()
    this.getRsvps()

    this.deleteRsvpButton = document.getElementById('cancel-rsvp')
    this.rsvpButton = document.getElementById('rsvp-event')
    this.rsvpsContainer = document.getElementById('show-rsvps')
    this.reviewsEventContainer = document.getElementById('show-reviews')
    this.reviewerId = document.getElementById('review_reviewer_id')
    this.eventId = document.getElementById('show-event')
    this.reviewBody = document.getElementById('review_body')
    this.eventsContainer = document.getElementById('output')
    this.eventContainer = document.getElementById('show-event')
    this.reviewContainer = document.getElementById('show-reviews')
    this.reviewSubmitButton = document.getElementById('submit-review')
    this.reviewSubmitButton.addEventListener('click', this.createReview.bind(this))
    this.reviewsEventContainer.addEventListener('click', this.deleteEventReview.bind(this))
    this.rsvpButton.addEventListener('click', this.rsvpToEvent.bind(this))
    // this.deleteRsvpButton.addEventListener('click', this.deleteRsvp.bind(this))
    this.rsvpsContainer.addEventListener('click', this.deleteRsvp.bind(this))



  }

  getEvents(e) {
    // e.preventDefault();
    this.adapter.fetchEvents('http://localhost:3000/events')
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


  getEvent() {
    //  debugger
    const id = document.getElementById('show-event').dataset.id

    this.adapter.fetchEvents(`http://localhost:3000/events/${id}`)
      .then(data => {
        const showEvent = new Event(data)
        const showEventHtml = showEvent.renderEvent()
        this.eventContainer.innerHTML = showEventHtml
      })
  }

  getReviews() {

    const id = document.getElementById('show-event').dataset.id

    this.adapter.fetchEvents(`http://localhost:3000/events/${id}/reviews`)
      .then(reviews => {
        reviews.forEach(review => this.reviews.push(new Review(review)))
        console.log(this.reviews)
      })
      .then(() => {

        this.renderEventsReview()
      })
  }

  renderEventsReview() {
    this.reviewContainer.innerHTML = this.reviews.map(review => review.renderReview()).join('')
  }

  getRsvps() {
    // debugger
    const rsvpId = document.getElementById('show-event').dataset.id
    this.adapter.fetchEvents(`http://localhost:3000/events/${rsvpId}/rsvps`)
      .then(rsvps => {
        rsvps.forEach(rsvp => this.rsvps.push(new Rsvp(rsvp)))
        console.log(this.rsvps)
      })
      .then(() => {
        this.renderEventRsvps()
      })
  }

  renderEventRsvps() {
    this.rsvpsContainer.innerHTML = this.rsvps.map(rsvp => rsvp.renderRsvp()).join('')
  }



  createReview(e) {
    e.preventDefault();

    const reviewer_id = document.getElementById('review_reviewer_id').value;
    const reviewing_event_id = document.getElementById('show-event').dataset.id;
    const body = document.getElementById('review_body').value;

    this.adapter.createReview(reviewer_id, reviewing_event_id, body)
      .then(review => {
        this.reviews.push(new Review(review))
        this.reviewBody.value = ''
        this.reviews = []
        this.getReviews()
      })

  }

  rsvpToEvent(e) {
    e.preventDefault();

    const participant_id = this.rsvpButton.dataset.id;
    const attending_event_id = document.getElementById('show-event').dataset.id;

    this.adapter.createRsvp(participant_id, attending_event_id)
      .then(rsvp => {
        this.rsvps.push(new Rsvp(rsvp))
        this.rsvps = []
        this.getRsvps()
      })
  }

  deleteRsvp(e) {
    e.preventDefault();
    //  debugger

    const participantId = e.target.parentElement.previousElementSibling.dataset.id;
    const userId = this.rsvpButton.dataset.id
    if (userId === participantId) {
      const rsvpId = e.target.parentElement.dataset.id;
      const id = this.eventId.dataset.id;

      if (confirm('Are You Sure, You can Only delete your Rsvp')) {
        this.adapter.deleteEvent(`http://localhost:3000/events/${id}/rsvps/${rsvpId}.json`)
          .then(rsvps => {
            console.log('deleted rsvp')
            this.rsvps = []
            this.getRsvps()
          })
          .catch(err => console.log(err))
      }
    }
  }





  deleteEventReview(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('delete-review')) {
      const review_id = e.target.parentElement.previousElementSibling.dataset.id;
      const id = this.eventId.dataset.id;


      if (confirm('Do You Want to delete?')) {
        this.adapter.deleteEvent(`http://localhost:3000/events/${id}/reviews/${review_id}.json`)
          .then(reviews => {


            console.log('deleted review')
            this.reviews = []
            this.getReviews()


          })
         .catch(err => console.log(err));
      }

    }

  }


}