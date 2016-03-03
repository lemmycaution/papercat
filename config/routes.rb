Papercat::Engine.routes.draw do
  namespace :api do
    resources :documents
    resources :templates
    resources :javascripts
    resources :stylesheets
    resources :pages
    resources :images
  end
  get 'admin' => 'application'
  get ':path' => 'pages#show'
  root to: 'pages#show'
end
