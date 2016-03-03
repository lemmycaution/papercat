require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class DocumentsController < BaseController
      protected
      
      def permitted_attributes
        [:data => [:body, :format, :handler, :locale, :partial, :path]]
      end
      
      def model
        params[:type] ? params[:type].constantize : super
      end
      
    end
  end
end