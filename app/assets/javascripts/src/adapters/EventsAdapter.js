class EventsAdapter {

  constructor() {
    this.token = document.querySelector('[name="authenticity_token"]')
    this.csrfToken = document.querySelector("meta[name=csrf-token]")

    
  }
  
  fetchEvents(url) {
    return fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(this.status)
    .then(this.json)
    .catch(error => console.error('Error:', error));
  }

  createEvent(name, location, description, planner_id, start_date, end_date) {
    
    
    const event = {
      name: name,
      location: location,
      description: description,
      planner_id: planner_id,
      start_date: start_date,
      end_date: end_date
    }
    
    return fetch(`http://localhost:3000/users/${planner_id}/events`, {
      method: 'POST',
      
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
         'X-CSRF-Token': this.token.value
      },
      body: JSON.stringify({event}),
    }).then(this.status)
      .then(this.json)
      .catch(error => console.error('Error message from adapter:', error));
  }

  deleteEvent(url) {
    // const csrfToken = document.querySelector("meta[name=csrf-token]").content
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': this.csrfToken.content
      }
    })
     .then(this.status)
     .then(this.json)
     .catch(error => console.error('Error:', error));
  }  

  updateEvent(name, location, description, planner_id, start_date, end_date, id) {
    const event = {
      name: name,
      location: location,
      description: description,
      start_date: start_date,
      end_date: end_date
    }
    return fetch(`http://localhost:3000/events/${id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': this.csrfToken.content
          },
          body: JSON.stringify({
            event
          }),

  }).then(this.status)
    .then(this.json)
    .catch(error => console.error('Error:', error));
}

createReview(reviewer_id, reviewing_event_id, body) {
  const review = {
    reviewer_id: reviewer_id,
    reviewing_event_id: reviewing_event_id,
    body: body
  }
  return fetch(`http://localhost:3000/events/${reviewing_event_id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': this.csrfToken.content
    },
    body: JSON.stringify({review}),
  }).then(this.status)
    .then(this.json)
    .catch(error => console.error('Error:', error));
}

createRsvp(participant_id, attending_event_id) {
  const rsvp = {
    participant_id: participant_id,
    attending_event_id: attending_event_id
  }
  return fetch(`http://localhost:3000/events/${attending_event_id}/rsvps`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': this.csrfToken.content
    },
    body: JSON.stringify({rsvp}),
  }).then(this.status)
    .then(this.json)
    .catch(error => console.error('Error:', error));
}

  status(response) {
    if(response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  json(response) {
    return response.json()
  }


}