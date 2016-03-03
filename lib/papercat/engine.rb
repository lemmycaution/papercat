require 'papercat/uniqueness_validator'

module Papercat
  class Engine < ::Rails::Engine
    isolate_namespace Papercat
  end
end
