class CreateOrderedProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :ordered_products do |t|
      t.integer :cart_id
      t.string :name
      t.integer :price
      t.string :image

      t.timestamps
    end
  end
end
