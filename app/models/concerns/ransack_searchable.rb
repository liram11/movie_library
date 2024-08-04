# frozen_string_literal: true

module RansackSearchable
  extend ActiveSupport::Concern

  included do
    def self.ransackable_attributes(_auth_object = nil)
      authorizable_ransackable_attributes
    end

    def self.ransackable_associations(_auth_object = nil)
      authorizable_ransackable_associations
    end
  end
end
