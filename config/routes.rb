Papercat::Engine.routes.draw do
  devise_for :users, class_name: "Papercat::User", module: :devise
  authenticate do
    namespace :api do
      resources :documents
      resources :templates
      resources :javascripts
      resources :stylesheets
      resources :pages
      resources :images
    end
    get 'admin' => 'application'
    root to: 'application#admin', as: :authenticated_root, path: '/admin'
  end
  get ':path' => 'pages#show'
  root to: 'pages#show'
end
