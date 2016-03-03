Papercat::Engine.routes.draw do
  namespace :api do
    resources :documents
    resources :images
  end
end
