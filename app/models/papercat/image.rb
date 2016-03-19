module Papercat
  class Image < ActiveRecord::Base
    mount_uploader :file, ImageUploader
    def location
      file.url
    end
    def as_json options = {}
      super(options.merge(methods: [:location]))
    end
  end
end
