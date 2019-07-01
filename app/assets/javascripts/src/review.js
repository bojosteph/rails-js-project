class Review {
  constructor(attributes) {
    this.body = attributes["body"];
    this.full_name = attributes["full_name"]
  }

  renderReview() {
    return (`
    <li>${this.full_name} says: ${this.body}</li>

    `)
  }



}