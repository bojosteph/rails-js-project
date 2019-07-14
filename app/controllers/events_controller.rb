class EventsController < ApplicationController
    # skip_before_action :verify_authenticity_token
    before_action :authenticate_user!
    before_action :set_time_zone, if: :user_signed_in?
    
    def index 
        # raise params.inspect
        if params[:user_id]
          @user = User.find_by(id: params[:user_id])
          @events = @user.events
        else
          @events = Event.all
        end
         respond_to do |format|
          format.html {}
          format.json { render json: @events, status: 200}
      end
    end
    
       
    
    def show        
      @user = current_user
      @event = Event.find(params[:id])
      @rsvp = Rsvp.find_by(participant_id: @user.id, attending_event_id: @event.id)
      @review = Review.new
      # @review = Review.find_by(reviewer_id: @user.id, reviewing_event_id: @event.id)
      @rsvps = Rsvp.where(attending_event_id: @event.id)
      @reviews = Review.where(reviewing_event_id: @event.id)
      respond_to do |format|
        format.html { render layout: 'event_show'}
        format.json { render json: @event, status: 200}
      end
    end

    def new
      @event = Event.new
    end
  
    def create 
      @user =  current_user                       
      @event = @user.events.build(event_params)
  
      if @event.save
        respond_to do |format|
          format.html { redirect_to @event, notice: 'Event succesfully created' }
          format.json { render json: @event, status: 201}
       end
      else
        respond_to do |format|
          format.html { render :new }
          format.json { render json: @event.errors, status: :unprocessable_entity}
        end
      end
    end
  
    def edit
      # raise params.inspect
      @user = current_user
      @event = Event.find(params[:id])
    end
  
    def update
      @user = current_user
      @event = Event.find(params[:id])
      if @event.update(event_params)
        
        respond_to do |format|
          format.html { user_path(@user) }
          format.json { render json: @event, status: 200}
        end
      else
        render :edit
      end
    end
  
    def destroy
      @user = current_user
      @event = Event.find(params[:id])
      @event.destroy
      # flash[:message] = "YOU HAVE DELETED #{@event.name.upcase}"
      respond_to do |format|
          format.html { event_path(@user) }
          format.json { render json: {eventId: @event.id}}
      end
    end
   
                                  
  
    private
  
    def event_params
      params.require(:event).permit(:name, :location, :description, :search, :planner_id, :start_date, :end_date)
    end
  
    def set_time_zone
      Time.zone = 'Eastern Time (US & Canada)'
    end
  
    
  end