module Papercat
  class UniquenessValidator < ActiveModel::Validator
    def validate(record)
      record.errors.add options[:key], :taken if record.class.get(options[:key] => record.public_send(options[:key])).first
    end
  end
end