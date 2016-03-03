require_dependency "papercat/application_controller"

module Papercat
  module Api
    class BaseController < ApplicationController

      before_action :set_collection, only: [:index]
      before_action :set_record, only: [:show, :update, :destroy]

      respond_to :json

      rescue_from ActiveRecord::RecordNotFound do |exception|
        render nothing: true, :status => :not_found
      end

      def index
        respond_with(@collection, location: collection_path)
      end

      def show
        respond_with(@record, location: record_path)
      end

      def create
        @record = model.new(model_params)
        @record.save
        respond_with(@record, location: record_path)
      end

      def update
        @record.update(model_params)
        respond_with(@record, location: record_path)
      end

      def destroy
        @record.destroy
        respond_with(@record, location: collection_path)
      end

      protected
  
      def collection_name
        @collection_name ||= self.class.name.demodulize.gsub(/Controller/,'').downcase
      end
  
      def model_name
        @model_name ||= collection_name.singularize
      end
  
      def model
        @model ||= ('Papercat::' + model_name.classify).constantize
      end
    
      def permitted_attributes
      end
    
      def record_path
        return collection_path unless @record.persisted?
        public_send :"api_#{model_name}_path", @record 
      end
    
      def collection_path
        public_send :"api_#{collection_name}_path"
      end

      private
    
      def set_collection
        @collection = model.all
      end
  
      def set_record
        @record = model.find_by!(id: params[:id])
      end

      def model_params
        params.require(model_name).permit(permitted_attributes)
      end
    end
  end
end