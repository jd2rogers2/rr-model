Rails.application.routes.draw do
  resources :ordered_products
  resources :carts
  resources :sessions
  resources :users do
    collection do
      get 'current'
    end
    # not sure if i'll need this anymore with current frontend redirecting to log in
  end
  resources :products
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
