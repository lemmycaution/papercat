Papercat::Engine.routes.draw do
  namespace :api do
    resources :documents
    resources :templates
    resources :javascripts, controller: :documents, type: 'Papercat::Javascript'
    resources :stylesheets, controller: :documents, type: 'Papercat::Stylesheet'
    resources :pages, controller: :documents, type: 'Papercat::Page'
    resources :images
  end
  get 'admin' => 'application'
  get ':path' => 'pages#show'
end
