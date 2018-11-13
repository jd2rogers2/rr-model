class CreateCarts < ActiveRecord::Migration[5.2]
  def change
    create_table :carts do |t|
      t.integer :user_id
      t.boolean :submitted

      t.timestamps
    end
  end
end
