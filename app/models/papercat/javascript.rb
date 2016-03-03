module Papercat
  class Javascript < Document

    store_accessor :data, :pathname, :source, :body

    validates_with UniquenessValidator, key: :pathname
    validates_presence_of :source

    before_save :minify

    private

    def minify
      self.body = Uglifier.compile(self.source)
    end
  end
end
