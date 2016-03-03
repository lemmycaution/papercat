module Papercat
  module PagesHelper
    include ActionView::Template::Handlers

    def render_page page
      body = page.body
      ERB.erb_implementation.new(page.body).result(binding).html_safe
    end
    
    def stylesheets
      content_tag :style do
        Stylesheet.all.inject('') { |m, s| m + s.body }
      end
    end
    
    def scripts
      content_tag :script do
        Javascript.all.inject('') { |m, s| m + s.body }
      end
    end
  end
end
