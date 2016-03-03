module Papercat
  class Page < Document
    store_accessor :data, :pathname, :title, :meta, :body
    validates_presence_of :title, :body
    validates_with UniquenessValidator, key: :pathname
    
    def as_json options = {}
      super(options.update(methods: [:pathname, :title, :meta, :body], except: [:data]))
    end
    
  end
end
