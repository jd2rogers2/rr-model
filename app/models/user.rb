class User < ApplicationRecord
  has_many :carts
  has_secure_password

  def current_cart
    self.carts.select{|cart| !cart.submitted}[0]
  end
end
