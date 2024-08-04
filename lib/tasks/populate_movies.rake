# frozen_string_literal: true

namespace :db do
  desc 'Parse movies.json and populate Movie, Actor, and Genre models'
  task populate_movies: :environment do
    require 'json'

    file_path = Rails.root.join('./movies.json')
    file = File.read(file_path)
    movies_data = JSON.parse(file)

    movies_data.each do |movie_data|
      movie = Movie.find_or_create_by(
        title: movie_data['title'],
        year: movie_data['year'].to_i,
        votes: movie_data['votes'].to_i,
        runtime: movie_data['runtime'].to_f,
        revenue: movie_data['revenue'].to_f,
        rating: movie_data['rating'].to_f,
        rank: movie_data['rank'].to_i,
        metascore: movie_data['metascore'].to_i,
        director: movie_data['director'],
        description: movie_data['description']
      )

      movie_data['actors'].each do |actor_name|
        actor = Actor.find_or_create_by(name: actor_name)
        movie.actors << actor unless movie.actors.include?(actor)
      end

      movie_data['genre'].each do |genre_name|
        genre = Genre.find_or_create_by(name: genre_name)
        movie.genres << genre unless movie.genres.include?(genre)
      end
    end
  end
end
