class RsvpsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rsvps = Rsvp.all
    respond_to do |format|
      format.html {render :index }
      format.json {render :json => @rsvps, status: 200}
    end
  end

  def new
    @rsvp = RsvpEvent.new
  end

  def create
    # raise params.inspect
    # user = current_user
    @event = Event.find(params[:id])
    @rsvp = current_user.rsvps.build(attending_event_id: params[:event_id])

    if @rsvp.save
      flash[:message] = "THANK YOU FOR JOINING #{@event.name.upcase}"
      redirect_to event_path(@event)
    else
      flash[:error] = 'YOU ALREADY JOINED THIS EVENT.'
      redirect_to event_path(@event)
    end
  end

  def show
    @rsvp = RsvpEvent.find(params[:id])
  end

  def destroy
    # raise params.inspect
    if params[:id]
      @user = current_user
      @event = Event.find(params[:id])
      rsvp = Rsvp.find_by(participant_id: @user.id, attending_event_id: @event.id)
      if rsvp.nil?
        redirect_to events_path(@event), alert: 'YOU CAN ONLY CANCEL YOUR RSVP '
      else

        rsvp.participant == @user
        rsvp.delete
        flash[:message] = "YOU CANCELLED YOUR RSVP FOR  #{@event.name.upcase}."
        redirect_to event_path(@event)
      end
    end
  end
end
