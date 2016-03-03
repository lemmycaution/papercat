require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class StylesheetsController < BaseController
      protected
      
      def permitted_attributes
        [:pathname, :source]
      end
      
    end
  end
end