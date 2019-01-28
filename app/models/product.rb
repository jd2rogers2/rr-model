class Product < ApplicationRecord
  def self.filter_by_name(user_input)
    self.where('name LIKE ?', "%#{user_input}%")
  end
end
