require 'test_helper'

module Papercat
  class TemplateTest < ActiveSupport::TestCase
    test "validates" do
      t = Template.create(data: {
        :format => "html",
        :handler => "erb",
        :locale => "en",
        :partial => false
      })
      refute t.persisted?
    end
    test "resolver returns a template with the saved body" do
      resolver = Template::Resolver.instance
      details  = { :formats => [:html],  :handlers => [:erb], :locale => [:en] }
      assert resolver.find_all("layouts", "application", false, details).empty?
      Template.create!({
        :body => "<%= 'hi from db template' %>",
        :path => "layouts/application",
        :format => "html",
        :handler => "erb",
        :locale => "en",
        :partial => false
      })
      template = resolver.find_all("application", "layouts", false, details).first
    
      assert_equal ActionView::Template, template.class  
      assert_equal "<%= 'hi from db template' %>", template.source
      assert_equal ActionView::Template::Handlers::ERB, template.handler.class
      assert_equal [:html], template.formats
      assert_equal "layouts/application", template.virtual_path
    end
  
    test "renders partial template" do
      k = Template.create!({
        :body => "<%= 'hi from db template' %>",
        :path => "shared/header",
        :format => "html",
        :handler => "erb",
        :locale => "en",
        :partial => true
      })

      resolver = Template::Resolver.instance
      details  = { :formats => [:html],  :handlers => [:erb], :locale => [:en] }
      template = resolver.find_all("header", "shared", true, details).first

      assert_equal ActionView::Template, template.class
      assert_equal "<%= 'hi from db template' %>", template.source
      assert_equal ActionView::Template::Handlers::ERB, template.handler.class
      assert_equal [:html], template.formats
      assert_equal "shared/_header", template.virtual_path
    end

    test "template expires the cache on update" do

      Template.create!({
        :body => "<%= 'hi from db template' %>",
        :path => "layouts/application",
        :format => "html",
        :handler => "erb",
        :locale => "en",
        :partial => false
      })


      resolver = Template::Resolver.instance
      details = { :formats => [:html],  :handlers => [:erb], :locale => [:en] }
      t = resolver.find_all("application", "layouts", false, details).first
      assert_equal "<%= 'hi from db template' %>", t.source

      template = Template.first
      template.update_attributes(body: "New body for template")
      t = resolver.find_all("application", "layouts", false, details).first
      assert_equal "New body for template", t.source
    end

  end
end
