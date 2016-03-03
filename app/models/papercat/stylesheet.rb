module Papercat
  class Stylesheet < Document
    store_accessor :data, :pathname, :source
    validates_with UniquenessValidator, key: :pathname
  end
end
