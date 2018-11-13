class Cart < ApplicationRecord
  has_many :ordered_products
  belongs_to :user

  def self.get_current(id)
    self.select{|cart| !cart.submitted && cart.user.id === id}[0]
  end
end
