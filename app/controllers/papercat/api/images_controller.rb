require_dependency "papercat/api/base_controller"

module Papercat
  module Api
    class ImagesController < ApplicationController
      skip_before_filter :verify_authenticity_token

      respond_to :json

      def create
        @record = Image.new(file: params[:file])
        if @record.save
          render(json: @record.as_json)
        else
          render(json: @record.errors)
        end
      end

    end
  end
end
