class Rsvp {
  constructor(obj) {
    this.id = obj.id
    this.participant = obj.participant
    this.participant_id = obj.participant_id
  }

  renderRsvp() {
        return (`
        <div class="card mb-3">
          <div class="card-rsvp-body">
            <li data-id="${this.participant_id}">${this.participant}</li>
            <a href="#" class="delete-rsvp card-link" data-id="${this.id}">
                        <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
        `)
      }
}