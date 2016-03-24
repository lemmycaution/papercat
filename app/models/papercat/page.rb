module Papercat
  class Page < Document
    store_accessor :data, :pathname, :title, :meta, :body, :default
    validates_presence_of :title, :body
    validates_with UniquenessValidator, key: :pathname

    # ensure meta always will be saved as json instead of json string
    def meta=val
      val = JSON.parse(val) if val.is_a?(String)
      write_store_attribute(:data, :meta, val)
    end

    def as_json options = {}
      super(options.update(methods: [:pathname, :title, :meta, :body, :default], except: [:data]))
    end

  end
end
