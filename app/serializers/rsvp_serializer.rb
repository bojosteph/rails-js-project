class RsvpSerializer < ActiveModel::Serializer
  attributes :id, :participant_id, :attending_event_id
end
