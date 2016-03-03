require "yui/compressor"

module Papercat
  class Stylesheet < Document
    
    YUI_JAR_FILE = "#{Papercat::Engine.root}/vendor/yuicompressor-2.4.8.jar"
    COMPRESSOR = YUI::CssCompressor.new({jar_file: YUI_JAR_FILE})
    
    store_accessor :data, :pathname, :source, :body
    
    validates_with UniquenessValidator, key: :pathname
    
    validates_presence_of :source

    before_save :minify
    
    private
    
    def minify
      self.body = COMPRESSOR.compress(source)
    end

  end
end
