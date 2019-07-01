class UI {
  constructor() {
    
    this.idInput = document.querySelector('#id');
    this.eventSubmit = document.querySelector('.event-submit');
    this.forState = 'add';
    
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.eventsContainer');
    const events = document.querySelector('#events');
    container.insertBefore(div, events);

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearFields() {
    this.newEventName.value = '';
    this.newEventLocation.value = '';
    this.newEventDescription.value = '';
    this.newEventStart.value = '';
    this.newEventEnd.value = '';
  }


  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
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