require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class TemplatesController < BaseController
      protected
      
      def permitted_attributes
        [:body, :format, :handler, :locale, :partial, :path]
      end
      
    end
  end
end