class Cart < ApplicationRecord
  has_many :ordered_products
  belongs_to :user
end
