user1 = User.create(username: "robby", email: "rob@test.com", password: "hello1", full_name: "Roddy Baby")
user2 = User.create(username: "rocky", email: "rocky@test.com", password: "adrian1", full_name: "Rocky Balboa")
user3 = User.create(username: "wonka", email: "wonka@test.com", password: "candy22", full_name: "Thanos Wonka")
user4 = User.create(username: "robby23", email: "rob23@test.com", password: "hello11", full_name: "Toddy Hotty")
user5 = User.create(username: "rocky23", email: "rocky23@test.com", password: "adrian11", full_name: "Rocky Roaddy")
user6 = User.create(username: "wonka23", email: "wonka23@test.com", password: "candy23", full_name: "Sam Sammy")


event1 = user1.events.create(name: " Chattoga County Health Fair",  location: "Summerville Senior Center", description: "Education and Inservice about Hypertension with Free Health Screen", start_date: Faker::Date.forward(23), end_date: Faker::Date.forward(33))
event2 = user2.events.create(name: " Boxing for Winners not Weiners",  location: "Phillips Center", description: "Boxing Conference to use Boxing to lose weight and train not to get beat up in a fight ", start_date: Faker::Date.forward(60), end_date: Faker::Date.forward(70))
event3 = user3.events.create(name: " Candy Event", location: "Willy Wonka Factory", description: "For The love of Candy , Candy Making and Technique", start_date: Faker::Date.forward(5), end_date: Faker::Date.forward(30))
event4 = user4.events.create(name: " Floyd County Fair",  location: "Floyd Park Center", description: "Its The COUNTY fair , Funnel Cake and Safe rides ", start_date: Faker::Date.forward(8), end_date: Faker::Date.forward(18))
event5 = user5.events.create(name: " Playoff Basketball",  location: "Phillips Center", description: "Eastern  Conference Finals ", start_date: Faker::Date.forward(36), end_date: Faker::Date.forward(45))
event6 = user6.events.create(name: " Meetup Event", location: "Starbucks Cheesecake Factory", description: "Tech Meetup and dessert", start_date: Faker::Date.forward(2), end_date: Faker::Date.forward(10))

user2.rsvps.create(attending_event_id: event1.id)
user1.rsvps.create(attending_event_id: event3.id)
user3.rsvps.create(attending_event_id: event2.id)
user4.rsvps.create(attending_event_id: event1.id)
user5.rsvps.create(attending_event_id: event2.id)
user6.rsvps.create(attending_event_id: event3.id)


event3.reviews.create(reviewer_id: user3.id, body: "I like attending this event and I love Candy")