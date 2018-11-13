Rails.application.routes.draw do
  resources :ordered_products
  resources :carts
  resources :users
  resources :products
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
