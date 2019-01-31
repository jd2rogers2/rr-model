Rails.application.routes.draw do
  resource :sessions, only: [:create, :destroy, :show]
  resources :ordered_products
  resources :carts
  resources :users
  resources :products
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
