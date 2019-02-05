Rails.application.routes.draw do
  resource :sessions, only: [:create, :destroy, :show]
  resources :ordered_products
  resources :carts
  resources :users
  resources :products

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
