class EventsAdapter {

  constructor() {
    this.token = document.querySelector('[name="authenticity_token"]')
    this.csrfToken = document.querySelector("meta[name=csrf-token]")

    
  }

  
  fetchEvents(url) {
    return fetch(url)
    .then(this.status)
    .then(this.json)
  }

  createEvent(name, location, description, planner_id, start_date, end_date) {
    // const token = document.querySelector('[name="authenticity_token"]').value;
    
    const event = {
      name: name,
      location: location,
      description: description,
      planner_id: planner_id,
      start_date: start_date,
      end_date: end_date
    }
    
    return fetch('http://localhost:3000/events.json', {
      method: 'POST',
      
      headers: {
        'content-type': 'application/json',
         'X-CSRF-Token': this.token.value
      },
      body: JSON.stringify({ event}),
    }).then(res => res.json())
  }

  deleteEvent(url) {
    // const csrfToken = document.querySelector("meta[name=csrf-token]").content
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': this.csrfToken.content
      }
    })
     .then(this.status)
  }

  updateEvent(name, location, description, planner_id, start_date, end_date, id) {
    const event = {
      name: name,
      location: location,
      description: description,
      start_date: start_date,
      end_date: end_date
    }
    return fetch(`http://localhost:3000/events/${id}.json`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            'X-CSRF-Token': this.csrfToken.content
          },
          body: JSON.stringify({
            event
          }),

  }).then(this.status)
    .then(this.json)
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