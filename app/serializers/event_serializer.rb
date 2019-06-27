class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description,  :start_date, :end_date
  has_many :rsvp_events
  has_many :reviews, foreign_key: :reviewing_event_id
  belongs_to :planner, class_name: 'User', foreign_key: 'planner_id'
  belongs_to :category
  def start_date
    object.start_date.strftime('%b %e, %l:%M %p')
  end

  def end_date
    object.end_date.strftime('%b %e, %l:%M %p')
  end
end
