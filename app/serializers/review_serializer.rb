class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :full_name
  belongs_to :reviewing_event, class_name: 'Event', foreign_key: 'reviewing_event_id'
  belongs_to :reviewer, class_name: 'User', foreign_key: 'reviewer_id'

  def full_name
    object.reviewer.full_name
  end

end
