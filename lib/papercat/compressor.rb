require "yui/compressor"

module Papercat
  module Compressor
    YUI_JAR_FILE = "#{Papercat::Engine.root}/vendor/yuicompressor-2.4.8.jar"
    CSS = YUI::CssCompressor.new({jar_file: YUI_JAR_FILE})
    JS  = YUI::JavaScriptCompressor.new({jar_file: YUI_JAR_FILE, munge: true})
    module_function
    def compress source, type
      (type == :js ? JS : CSS).compress(source)
    end
  end
end