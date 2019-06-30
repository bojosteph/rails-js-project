


function run() {
  // do something
  console.log('Im Running Events')
  const events = new Events();
}
// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else document.attachEvent('onreadystatechange', function () {
  if (document.readyState == 'complete') run();
});


class Events {
  constructor() {
  
    
    this.adapter = new EventsAdapter();
       
    this.getEvents()
    
    this.eventsContainer = document.getElementById('output');
      
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
        
  }







  
