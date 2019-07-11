class Event {
  constructor(event) {
    this.id = event.id
    this.name = event.name
    this.location = event.location
    this.description = event.description
    this.start_date = event.start_date
    this.end_date = event.end_date
    this.reviews = event.reviews
    this.rsvps = event.rsvps
    this.planner = event.planner
    this.idInput = document.querySelector('#id');
    this.eventSubmit = document.querySelector('.event-submit');
    this.forState = 'add';
  }
  renderEvents() {
    
    return (`
      <div class="card-mb-3">
                <div class="card-body">
                  <a href="/events/${this.id}"><h4 class="card-name">${this.name}</h4></a>
                  <h6 class="card-location">${this.location}</h6>
                  <p class="card-description">${this.description}</p>
                  <p class="card-start-date">${this.start_date}</p>
                  <p class="card-end-date">${this.end_date}</p> 
                 <a href="#" class="edit card-link" id="show-event-data" data-id="${this.id}">
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
                <div  class="card-body">
                  <h4 class="card-name">${this.name}</h4>
                  <h5 class="card-location">${this.location}</h5>
                  <h6 class="card-description">${this.description}</h6>
                  <h6 class="card-start-date">${this.start_date}</h6>
                  <h6 class="card-end-date">${this.end_date}</h6> 
                 
                </div>
                  
             </div> 
    `)
  }

  renderModal() {
    return (`
    <button id="myBtn">Open Modal</button>

    <div id="myModal" class="modal">

 
        <div class="modal-content">
          <span class="close">&times;</span>
           <div class="card-mb-3">
                <div class="card-body">
                  <a href="/events/${this.id}"><h4 class="card-name">${this.name}</h4></a>
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
        </div>

    </div>
  


    `)
  }
  

    
}