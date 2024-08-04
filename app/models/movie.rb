# frozen_string_literal: true

class Movie < ApplicationRecord
  include RansackSearchable

  has_and_belongs_to_many :actors
  has_and_belongs_to_many :genres

  # allows filtering by exact match of genre_ids
  ransacker :genre_ids do |_parent|
    Arel::Nodes::SqlLiteral.new(
      "(SELECT concat('|', array_to_string(array_agg(genre_id), '|'), '|') FROM genres_movies WHERE genres_movies.movie_id = movies.id GROUP BY movie_id)"
    )
  end
end
