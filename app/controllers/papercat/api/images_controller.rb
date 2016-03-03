require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class ImagesController < BaseController
      protected
      def permitted_attributes
        [:file]
      end
    end
  end
end