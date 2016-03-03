module Papercat
  class Page < Document
    store_accessor :data, :pathname
    validates_with UniquenessValidator, key: :pathname
  end
end
