module Papercat
  class Javascript < Document

    store_accessor :data, :pathname, :source, :body

    validates_with UniquenessValidator, key: :pathname
    validates_presence_of :source

    before_save :minify
    
    def as_json options = {}
      super(options.update(methods: [:pathname, :source], except: [:data]))
    end
    
    private

    def minify
      self.body = Uglifier.compile(self.source)
    end
  end
end
