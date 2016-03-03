module Papercat
  module TemplateResolver

    extend ActiveSupport::Concern

    included do
      prepend_view_path Papercat::Template::Resolver.instance
    end
  end
end