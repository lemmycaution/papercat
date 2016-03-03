require 'carrierwave'
require 'responders'
require 'uglifier'
require 'devise'
require 'papercat/uniqueness_validator'
require 'papercat/template_resolver'

module Papercat
  class Engine < ::Rails::Engine
    isolate_namespace Papercat
  end
end
