require_dependency "papercat/application_controller"

module Papercat
  class PagesController < ApplicationController
    include TemplateResolver

    layout 'papercat/page'

    def show
      @page = Page.at(params[:path]) || Page.get(default: true).first
      redirect_to '/404' and return unless @page
    end

  end
end
