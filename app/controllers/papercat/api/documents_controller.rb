require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class DocumentsController < BaseController
      protected
      def permitted_attributes
        [:type, :data]
      end
    end
  end
end