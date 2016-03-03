require 'papercat/compressor'

module Papercat
  class Stylesheet < Document
    
    store_accessor :data, :pathname, :source, :body
    
    validates_with UniquenessValidator, key: :pathname
    
    validates_presence_of :source

    before_save :compress
    
    private
    
    def compress
      self.body = Compressor.compress(source, :css)
    end

  end
end
