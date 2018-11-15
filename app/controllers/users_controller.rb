class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def login
    @user = User.find_by(username: params[:username])
    authenticated = @user.try(:authenticate, params[:password])
    if authenticated
      render json: @user.to_json(:include => :current_cart)
    else
      render json: {}
    end
  end

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @user.cart = Cart.create(user_id: @user.id)

    if @user.save
      Cart.create(user_id: @user.id)
      render json: @user.to_json(:include => :current_cart)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :password_digest)
    end
end
