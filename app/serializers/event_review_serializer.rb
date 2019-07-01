class EventReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :full_name

  def full_name
    object.reviewer.full_name
  end
end
