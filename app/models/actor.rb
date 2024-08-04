# frozen_string_literal: true

class Actor < ApplicationRecord
  has_and_belongs_to_many :movies
end
