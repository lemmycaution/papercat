module Papercat
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    def admin
      render layout: 'papercat/application', inline: ''
    end
  end
end
