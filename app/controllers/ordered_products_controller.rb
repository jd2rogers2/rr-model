class OrderedProductsController < ApplicationController
  before_action :set_ordered_product, only: [:show, :update, :destroy]

  # GET /ordered_products
  def index
    @ordered_products = OrderedProduct.all

    render json: @ordered_products
  end

  # GET /ordered_products/1
  def show
    render json: @ordered_product
  end

  # POST /ordered_products
  def create
    @ordered_product = OrderedProduct.new(ordered_product_params)
    @ordered_product.cart_id = Cart.get_current(current_user.id).id

    if @ordered_product.save
      render json: @ordered_product, status: :created, location: @ordered_product
    else
      render json: @ordered_product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ordered_products/1
  def update
    if @ordered_product.update(ordered_product_params)
      render json: @ordered_product
    else
      render json: @ordered_product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ordered_products/1
  def destroy
    @ordered_product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ordered_product
      @ordered_product = OrderedProduct.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def ordered_product_params
      params.require(:ordered_product).permit(:name, :price, :image)
    end
end
