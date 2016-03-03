$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "papercat/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "papercat"
  s.version     = Papercat::VERSION
  s.authors     = ["Onur Uyar"]
  s.email       = ["me@onuruyar.com"]
  s.homepage    = "https://github.com/lemmycaution/papercat.git"
  s.summary     = "Tiny CMS"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.5.2"
  s.add_dependency "carrierwave", "~> 0.10.0"
  s.add_dependency "responders", "~> 2.0"
  s.add_dependency "uglifier", "~> 2.7.2"
  s.add_dependency "yui-compressor", "~> 0.12.0"
  s.add_dependency "sass-rails"
  
  s.add_development_dependency "pg"
  
end
