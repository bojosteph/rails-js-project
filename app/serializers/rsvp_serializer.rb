class RsvpSerializer < ActiveModel::Serializer
  attributes :participant
  belongs_to :attending_event, class_name: 'Event', foreign_key: 'attending_event_id'
  belongs_to :participant, class_name: 'User', foreign_key: 'participant_id'

  def participant
    object.participant.full_name
  end
end

