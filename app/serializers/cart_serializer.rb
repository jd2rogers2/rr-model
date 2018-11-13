class CartSerializer < ActiveModel::Serializer
  attributes :id
  has_many :ordered_products
end
