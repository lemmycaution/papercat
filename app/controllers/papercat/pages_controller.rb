require_dependency "papercat/application_controller"

module Papercat
  class PagesController < ApplicationController
    include TemplateResolver

    layout 'papercat/page'

    def show
      @page = Page.at(params[:path])
    end

  end
end
