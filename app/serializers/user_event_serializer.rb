class UserEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description,  :start_date, :end_date
end
