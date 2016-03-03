require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class PagesController < BaseController
      protected
      
      def permitted_attributes
        [:pathname, :title, :meta, :body, :default]
      end
      
    end
  end
end