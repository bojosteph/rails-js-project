class EventsController < ApplicationController

    
    def index
      @events = Event.all
      # render json: @events
        respond_to do |format|
         format.html { render :index }
         format.json { render json: @events, status: 200}
      end
    end 
  
    
    
  
  
    def show
      
      @event = Event.find(params[:id])
      render json: @event
      # respond_to do |format|
      #   format.html { render :js_show }
      #   format.json { render json: @event, status: 200}
      # end
    end
    
    
  
  
  
    def new
      @event = Event.new
    end
  
    def create                         
      @event = @user.events.build(event_params(:name, :location, :description, :search, :planner_id, :start_date, :end_date, :category_id, category_attributes: [:name]))
  
      if @event.save
        flash[:message] = "YOU HAVE CREATED #{@event.name.upcase}"
        redirect_to event_path(@event)
      else
        @event.build_category
        render :new
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
        flash[:message] = "YOU HAVE UPDATED #{@event.name.upcase}"
        redirect_to event_path(@event)
      else
        render :edit
      end
    end
  
    def destroy
      @user = current_user
      @event = Event.find(params[:id])
      @event.destroy
      flash[:message] = "YOU HAVE DELETED #{@event.name.upcase}"
      redirect_to events_path(@user)
    end
   
                                  
  
    private
  
    def event_params
      params.require(:event).permit(:name, :location, :description, :search, :planner_id, :start_date, :end_date)
    end
  
    def set_time_zone
      Time.zone = 'Eastern Time (US & Canada)'
    end
  
    
  end