# frozen_string_literal: true

class CreateActors < ActiveRecord::Migration[7.1]
  def change
    create_table :actors do |t|
      t.string :name, null: false
      t.timestamps
    end

    add_index :actors, :name, unique: true

    create_table :actors_movies do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :actor, null: false, foreign_key: true
      t.timestamps
    end
  end
end
