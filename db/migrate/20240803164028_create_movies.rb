# frozen_string_literal: true

class CreateMovies < ActiveRecord::Migration[7.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :year
      t.bigint :votes
      t.decimal :runtime, precision: 5, scale: 2
      t.decimal :revenue, precision: 14, scale: 2
      t.decimal :rating, precision: 5, scale: 1
      t.integer :rank
      t.integer :metascore
      t.string :director
      t.text :description
      t.timestamps
    end
  end
end
