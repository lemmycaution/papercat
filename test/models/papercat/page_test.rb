require 'test_helper'

module Papercat
  class PageTest < ActiveSupport::TestCase
    test "uniq pathname" do
      Page.create(data: {pathname: 'one'})
      page = Page.create(data: {pathname: 'one'})
      refute page.persisted?
    end
  end
end
