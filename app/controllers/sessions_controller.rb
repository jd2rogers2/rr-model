class SessionsController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])
    authenticated = @user.try(:authenticate, params[:password])
    return head(:forbidden) unless authenticated
    session[:user_id] = @user.id
    render json: @user.to_json
  end

  def destroy
    session.delete :user_id
  end
end
