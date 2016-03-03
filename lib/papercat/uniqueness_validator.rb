module Papercat
  class UniquenessValidator < ActiveModel::Validator
    def validate(record)
      found = record.class.get(options[:key] => record.public_send(options[:key])).first
      record.errors.add options[:key], :taken if found && found.id != record.id
    end
  end
end