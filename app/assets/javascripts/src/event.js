class Event {
  constructor(event) {
    this.id = event.id
    this.name = event.name
    this.location = event.location
    this.description = event.description
    this.start_date = event.start_date
    this.end_date = event.end_date
    // this.reviews = event.reviews
    // this.rsvp_events = event.rsvp_events
  }
  renderEvents() {
    // let eventReviews = this.reviews.map(review => {
    //   return (`
    // <p>Reviewer: ${review.full_name} Rating: ${review.rating}  Review: ${review.body}</p>
    // `)
    // }).join('')

    // let eventParticipants = this.rsvp_events.map(rsvp => {
    //   return (`
    // <p>Participants: ${rsvp.participant}</p>
    // `)
    // }).join('')
    return (`
      <div class="card-mb-3">
                <div class="card-body">
                  <h5 class="card-name">${this.name}</h4>
                  <h6 class="card-location">${this.location}</h6i>
                  <p class="card-description">${this.description}</p>
                  <p class="card-start-date">${this.start_date}</p>
                  <p class="card-end-date">${this.end_date}</li> <br>
                 <a href="#" class="edit card-link" data-id="${this.id}">
                    <i class="fa fa-pencil"></i>
                 </a>

                 <a href="#" class="delete card-link" data-id="${this.id}">
                    <i class="fa fa-remove"></i>
                 </a>
                </div>
                  
             </div> 
    `)
  }
}