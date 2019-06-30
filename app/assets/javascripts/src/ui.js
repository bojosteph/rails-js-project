class UI {
  constructor() {
    
    this.idInput = document.querySelector('#id');
    this.eventSubmit = document.querySelector('.event-submit');
  }

  clearFields() {
    this.newEventName.value = '';
    this.newEventLocation.value = '';
    this.newEventDescription.value = '';
    this.newEventStart.value = '';
    this.newEventEnd.value = '';
  }

  fillForm(data) {
   editEvent.newEventName.value = data.name;
   editEvent.newEventLocation.value = data.location;
   editEvent.newEventDescription.value = data.descrition;
   editEvent.plannerId.value = data.planner_id;
   editEvent.newEventStart.value = data.start_date;
   editEvent.newEventEnd.value = data.end_date;

   this.changeFormState('edit');
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  changeFormState(type) {
    if(type === 'edit') {
      this.eventSubmit.textContent = 'Update Event';
      this.eventSubmit.className = 'event-submit btn btn-warning btn-block';
      
      const button = document.createElement('button');
      button.className = 'event-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');

      cardForm.insertBefore(button, formEnd)
    } else {
      this.eventSubmit.textContent = 'Post It';
      this.eventSubmit.className = 'event-submit btn btn-primary btn-block';

      if(document.querySelector('.event-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }
}