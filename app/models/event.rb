class Event < ApplicationRecord
  belongs_to :planner, class_name: 'User', foreign_key: 'planner_id'
  validates_presence_of :name, :location, :description, :start_date, :end_date
  has_many :rsvps, foreign_key: :attending_event_id
  has_many :participants, through: :rsvps, dependent: :destroy
  has_many :reviews, foreign_key: :reviewing_event_id
  has_many :reviewers, through: :reviews, dependent: :destroy
  alias_attribute :start_time, :start_date
  alias_attribute :end_time, :end_date
  

  validate :date_must_be_current, if: :has_date_range?
  validate :correct_date_range, if: :has_date_range?
  validate :no_overlapping_events, on: :create

  # before_save :upcase_name

  scope :overlapping, lambda { |start_date, end_date|
    where(
      'start_date <= :end_date AND :start_date <= end_date',
      start_date: start_date, end_date: end_date
    )
  }

  def self.top
    select('events.*, COUNT(rsvps.id) AS rsvps_count')
      .joins(:rsvp_events)
      .group('events.id')
      .order('rsvps_count DESC')
      .limit(5)
  end

  def no_overlapping_events
    event = Event.overlapping(start_date, end_date)
    overlaps = event.where('planner_id = ?', planner_id)

    if overlaps.any?
      dates = overlaps.map do |e|
        [e.start_date.strftime('Start Of Event : %A, %b %e, at %l:%M %p'), e.end_date.strftime('End Of Event : %A, %b %e, at %l:%M %p')].join(' to ')
      end.join(', ')
      errors.add(:base, "must not overlap existing events. Overlaps: #{dates}")
    end
  end

  def self.active_event
    where('end_date > ?', DateTime.now)
  end

  def self.past_event
    where('end_date < ?', DateTime.now)
  end

  def self.todays_event
    where('start_date = ?', Date.today)
  end

  def has_date_range?
    start_date.present? && end_date.present?
  end

  def date_must_be_current
    unless start_date >= DateTime.now
      errors.add(:start_date, 'must be on or after current date')
    end
  end

  def correct_date_range
    unless end_date >= start_date
      errors.add(:end_date, 'must be on or after start of event')
    end
  end

  def upcase_name
    name.upcase!
  end
  
  def presence
    self if present?
  end

  


  
end


