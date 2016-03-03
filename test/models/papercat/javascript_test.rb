require 'test_helper'

module Papercat
  class JavascriptTest < ActiveSupport::TestCase
    test "minify" do
      source = <<-JS
      function add (cons, pur) {
        return cons + pur;
      }
      JS
      script = Javascript.create(pathname: 'test', source: source)
      assert_equal 'function add(n,d){return n+d}', script.body
    end
  end
end
