class Review {
  constructor(attributes) {
    this.id = attributes.id
    this.body = attributes.body
    this.full_name = attributes.full_name
  }

  // renderReview() {
  //   return (`
  //   <div class="card mb-3">
  //     <div class="card-review-body">
  //       <li data-id=${this.id}>${this.full_name} says: ${this.body}</li>
  //       <a href="#" class="delete-review card-link" data-id="${this.id}">
  //                       <i class="fa fa-remove"></i>
  //       </a>
  //     </div>
  //   </div>
  //   `)
  // }

}

Review.prototype.renderReview = function () {
  return (`
    <div class="card mb-3">
      <div class="card-review-body">
        <li data-id=${this.id}>${this.full_name} says: ${this.body}</li>
        <a href="#" class="delete-review card-link" data-id="${this.id}">
                        <i class="fa fa-remove"></i>
        </a>
      </div>
    </div>
    `)

}