require 'test_helper'

module Papercat
  class PageTest < ActiveSupport::TestCase
    test "uniq pathname" do
      Page.create!(data: {pathname: 'one', title: 'one', body: 'body'})
      page = Page.create(data: {pathname: 'one', title: 'one', body: 'body'})
      refute page.persisted?
    end
  end
end
