module Papercat
  module PagesHelper
    include ActionView::Template::Handlers

    def render_page page
      body = page.body
      ERB.erb_implementation.new(page.body).result(binding).html_safe
    end
  end
end
