require 'test_helper'
require 'papercat/api/documents_controller'

module Papercat
  module Api
    class DocumentsControllerTest < ActionController::TestCase
      setup do
        @routes = Engine.routes
        @record = papercat_documents(:document_1)
      end

      test "should get index" do
        # sign_in :account, @admin
        xhr :get, :index, {format: :json}
        assert_response :success
        assert_not_nil assigns(:collection)
      end

      test "should create document" do
        assert_difference('Document.count') do
          xhr :post, :create, {format: :json, document: @record.data.dup}
        end
        assert_not_nil assigns(:record)
      end

      test "should show document" do
        # sign_in :account, @admin
        xhr :get, :show, {format: :json, id: @record.id}
        assert_response :success
        assert_not_nil assigns(:record)
      end

      test "should update document" do
        # sign_in :account, @admin
        xhr :patch, :update, {format: :json, id: @record.id, document: @record.data.dup}
        assert_not_nil assigns(:record)
      end

      test "should destroy document" do
        # sign_in :account, @admin
        assert_difference('Document.count', -1) do
          xhr :delete, :destroy, {format: :json, id: @record.id}
        end
        assert_not_nil assigns(:record)
      end

    end
  end
end