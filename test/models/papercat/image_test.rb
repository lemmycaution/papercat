require 'test_helper'

module Papercat
  class ImageTest < ActiveSupport::TestCase
    test "has uploadable file" do
      image = Image.create(file: File.new('test/support/image.jpg'))
      assert image.file
    end
  end
end
