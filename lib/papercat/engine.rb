require 'carrierwave'
require 'responders'
require 'papercat/uniqueness_validator'
require 'papercat/template_resolver'

module Papercat
  class Engine < ::Rails::Engine
    isolate_namespace Papercat
  end
end
