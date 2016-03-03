module Papercat
  class Document < ActiveRecord::Base
    
    def self.at pathname
      find_by("data #>> '{pathname}' = ?", pathname)
    end
    
    def self.get conditions
      where("data @> '#{conditions.to_json}'")
    end
    
    store_accessor :data, :pathname
    
    def set data
      update(data: self.data.deep_merge(data.deep_stringify_keys))
    end

    # def as_json options = {}
    #   super(options.update(methods: [:pathname]))
    # end
  end
end
