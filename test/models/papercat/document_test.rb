require 'test_helper'

module Papercat
  class DocumentTest < ActiveSupport::TestCase
    test "search pathname" do
      assert Document.at('pages/index-4')
    end
    test "set" do
      document = papercat_documents(:document_1)
      document.set({
        content: {
          en: {
            head: {
              meta: {
                description: 'test'
              }
            }
          },
          de: {
            body: 'de body'
          }
        }
      })
      assert document.data['content']['en']['head']['meta']['keywords']
      assert document.data['content']['en']['head']['meta']['description']
    end
    test "get" do
      assert Document.get({
        pathname: 'pages/index-2'
      }).first
    end
  end
end
