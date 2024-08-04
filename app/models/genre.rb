# frozen_string_literal: true

class Genre < ApplicationRecord
  include RansackSearchable

  has_and_belongs_to_many :movies
end
