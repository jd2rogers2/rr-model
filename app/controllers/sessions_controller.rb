class SessionsController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by(username: session_params[:username])
    if @user && @user.authenticate(session_params[:password])
      # below not even persisting when page doesn't refresh :(
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render json: {}
    end
  end

  def destroy
    session[:user_id] = nil
    render json: {}
  end

  def show
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
      redirect_to user_path(@user)
    else
      render json: {}
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def session_params
      params.require(:session).permit(:username, :password)
    end
end
