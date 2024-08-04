# frozen_string_literal: true

class CreateGenres < ActiveRecord::Migration[7.1]
  def change
    create_table :genres do |t|
      t.string :name, null: false
      t.timestamps
    end

    add_index :genres, :name, unique: true

    create_table :genres_movies do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :genre, null: false, foreign_key: true
      t.timestamps
    end
  end
end
