class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description,  :start_date, :end_date
  has_many :rsvps, foreign_key: :attending_event_id
  has_many :reviews, foreign_key: :reviewing_event_id
  belongs_to :planner, class_name: 'User', foreign_key: 'planner_id'
  
  def start_date
    object.start_date.strftime('%Y-%m-%d')
  end

  def end_date
    object.end_date.strftime('%Y-%m-%d')
  end
end
