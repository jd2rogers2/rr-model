class SessionsController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])
    if @user.authenticate(params[:password])
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
end
