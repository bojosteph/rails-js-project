// function run() {
 
//   console.log('Im Running Events')
//   const events = new Events();
// }

// if (document.readyState != 'loading') run();

// else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);

// else document.attachEvent('onreadystatechange', function () {
//   if (document.readyState == 'complete') run();
// });


class Events {
  constructor() {
    this.reviews = [];

    this.adapter = new EventsAdapter()

    this.getEvents()
    this.getEvent()
    this.getReviews()
    
    this.reviewsEventContainer = document.getElementById('show-reviews')
    this.reviewerId = document.getElementById('review_reviewer_id')
    this.eventId = document.getElementById('show-event')
    this.reviewBody = document.getElementById('review_body')
    this.eventsContainer = document.getElementById('output')
    this.eventContainer = document.getElementById('show-event')
    this.reviewContainer = document.getElementById('show-reviews')
    this.reviewForm = document.getElementById('new_review')
    this.reviewForm.addEventListener('submit', this.createReview.bind(this))
    this.reviewsEventContainer.addEventListener('click', this.deleteEventReview.bind(this))
   


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


  getEvent() {


    const id = document.getElementById('show-event').dataset.id

    this.adapter.fetchEvents(`http://localhost:3000/events/${id}.json`)
      .then(data => {
        const showEvent = new Event(data)
        const showEventHtml = showEvent.renderEvent()
        this.eventContainer.innerHTML = showEventHtml
      })
  }

  getReviews() {
   
    const id = document.getElementById('show-event').dataset.id
    
    this.adapter.fetchEvents(`http://localhost:3000/events/${id}/reviews.json`)
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



  createReview(e) {
    e.preventDefault();
        
    const reviewer_id = document.getElementById('review_reviewer_id').value;
    const reviewing_event_id = document.getElementById('show-event').dataset.id;
    const body = document.getElementById('review_body').value;

    this.adapter.createReview(reviewer_id, reviewing_event_id, body)
      .then(review => {
        this.reviews.push(new Review(review))
        this.reviewBody.value = '';
        this.renderEventsReview()
      })

  }

  

  deleteEventReview(e) {
    e.preventDefault();
    const review_id = e.target.parentElement.previousElementSibling.dataset.id;
    const id = this.eventId.dataset.id;

    if(confirm('Do You Want to delete?')) {
      this.adapter.deleteEvent(`http://localhost:3000/events/${id}/reviews/${review_id}.json`)
      .then(reviews => {
        console.log('deleted review')
        this.renderEventsReview();
  
        console.log(this.reviews)
      })  
      .catch(err => console.log(err));
    }
    e.preventDefault();
  }  
  
      
  }




