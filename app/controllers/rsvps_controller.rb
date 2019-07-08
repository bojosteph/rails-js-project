class RsvpsController < ApplicationController
   before_action :authenticate_user!

   def index 

    if params[:event_id]
      @event = Event.find_by(id: params[:event_id])
      @rsvps = @event.rsvps
    else
      @rsvps = Rsvp.all 
    end
      respond_to do |format|
        format.html {render :index}
        format.json {render :json => @rsvps, status: 200}
    end
  end


  def new 
    @rsvp = Rsvp.new
  end

  def create 
    @event = Event.find_by(id: params[:event_id])
    @rsvp = current_user.rsvps.build(attending_event_id: params[:event_id])

    if @rsvp.save
      respond_to do |f|
        f.html {redirect_to event_rsvps_path}
        f.json {render json: @rsvp, status: 201}
      end
    else
      respond_to do |f|
        f.html {render :new}
        f.json {render json: @rsvp.errors, status: :unprocessable_entity}
      end
    end
  end


  def destroy
    # raise params.inspect
    if params[:id]
      @user = current_user
      @event = Event.find_by(id: params[:event_id])
      @rsvp = Rsvp.find_by(participant_id: @user.id, attending_event_id: @event.id)
      if @rsvp.nil?
        respond_to do |f|
          f.html {redirect_to event_path(@event)}
          f.json {render json: @rsvp}
        end
      else
        @rsvp.participant == @user
        @rsvp.delete
        respond_to do |f|
          f.html {redirect_to event_path(@event)}
          f.json {render json: {rsvpId: @rsvp.id}}
        end
      end
    end

    
  end















end
