class EventsAdapter {

  constructor() {
    this.baseUrl =
      'http://localhost:3000/events.json'
    
  }

  
  fetchEvents(url) {
    return fetch(url)
    .then(this.status)
    .then(this.json)
  }

  createEvent(name, location, description, planner_id, start_date, end_date) {
    let token = document.querySelector('[name="authenticity_token"]').value;
    
    const event = {
      name: name,
      location: location,
      description: description,
      planner_id: planner_id,
      start_date: start_date,
      end_date: end_date
    }
    console.log(event)
    return fetch(this.baseUrl, {
      method: 'POST',
      
      headers: {
        'content-type': 'application/json',
         'X-CSRF-Token': token
      },
      body: JSON.stringify({ event}),
    }).then(res => res.json())
  }

  deleteEvent(url) {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': csrfToken
      }
    })
     .then(this.status)
     
    
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