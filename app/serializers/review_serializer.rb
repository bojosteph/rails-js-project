class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :reviewer_id, :reviewing_event_id, :body
end
