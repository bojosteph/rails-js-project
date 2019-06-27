class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :full_name
  has_many :rsvp_events
  has_many :events, foreign_key: 'planner_id'
  has_many :reviews, foreign_key: :reviewer_id
end
