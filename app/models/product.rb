class Product < ApplicationRecord
  def filter_by_name(search_text)
    self.all.filter{|product| product.name.include?(search_text)}
  end
end
