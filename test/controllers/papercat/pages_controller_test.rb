require 'test_helper'
require 'papercat/pages_controller'

module Papercat
  class PagesControllerTest < ActionController::TestCase
    setup do
      @routes = Engine.routes
      @page = Page.create(data: {pathname: 'pages/about', title: 'about', body: '<h1><%= "about" %></h1>'})
    end

    test "should get show" do
      get :show, path: 'pages/about'
      assert_response :success
      assert_template layout: "layouts/papercat/page"
      assert_select 'title', 'about'
      assert_select 'h1', 'about'
    end

  end
end
