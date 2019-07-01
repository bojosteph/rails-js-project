class Event {
  constructor(event) {
    this.id = event.id
    this.name = event.name
    this.location = event.location
    this.description = event.description
    this.start_date = event.start_date
    this.end_date = event.end_date
    this.reviews = event.reviews
    this.rsvp_events = event.rsvp_events
  }
  renderEvents() {
    
    return (`
      <div class="card-mb-3">
                <div class="card-body">
                  <a href="/events/${this.id}"><h5 class="card-name">${this.name}</h4></a>
                  <h6 class="card-location">${this.location}</h6>
                  <p class="card-description">${this.description}</p>
                  <p class="card-start-date">${this.start_date}</p>
                  <p class="card-end-date">${this.end_date}</p> 
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
  renderEvent() {
    return (`
      <div class="card-mb-3">
                <div class="card-body">
                  <a href="/events/${this.id}"><h5 class="card-name">${this.name}</h4></a>
                  <h6 class="card-location">${this.location}</h6>
                  <p class="card-description">${this.description}</p>
                  <p class="card-start-date">${this.start_date}</p>
                  <p class="card-end-date">${this.end_date}</p> 
                 
                </div>
                  
             </div> 
    `)
  }
}