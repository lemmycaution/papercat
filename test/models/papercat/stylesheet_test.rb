require 'test_helper'

module Papercat
  class StylesheetTest < ActiveSupport::TestCase
    test "compress" do
      source = <<-CSS
      body{
        color: red;
      }
      CSS
      script = Stylesheet.create(pathname: 'test', source: source)
      assert_equal 'body{color:red}', script.body
    end
  end
end
