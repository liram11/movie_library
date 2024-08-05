# Movie Library

Simple project that shows a movies table using Ruby On Rails, Turbo, and Stimulus.

# Running the project locally

Make sure that PostgreSQL is running locally.

Run bundler:
```
bundle
```

Set up the DB:
```
createdb movie_library_development
rails db:migrate
bin/rake db:populate_movies
```

Start the server:
```
rails s
```

# Architecture

The project uses Ruby On Rails for both the back-end and the front-end.

On the back-end side, I used `ransack` to filter the data and `pagy` for pagination. `Actor` and `Genre` were extracted to separate models to make the DB schema easier to extend later. There is also not much business logic at the moment, so I decided that using any approaches for extracting that would be excessive.

I decided not to use any specific gem for the datagrid on a front-end and built it using `turbo_streams` and `bootstrap`. This allows to easy customize the table if needed. Thanks to `turbo_streams` changing the filters or pagination doesn't force the reload of the whole page and makes the page responsive.

Clicking on a Table row opens the `CommentsModal` which uses `stimulus` to get data related to the current row and allows to browse and create comments.

# If you had more time, what would you like to improve?

- I would investigate if it's possible to get rid of the custom `ransacker` in the `Movie` model. At the moment it allows filtering by specific sets of genres and works fine, but it is a quick implementation. It also forces to patch params in a controller which doesn't look pretty.
- I would find a way to interrupt the `firebase` requests when the user closes the modal. At the moment there is a race condition possible.
- I would improve saving the filters to the URL params. At the moment this works partially.
- I would add some tests using `capybara` and `rspec` to make it easier to introduce new changes.
- I would introduce `view_components` and `lookbook` gems to make it easier to work with views. Setting up a better way to handle `css` would be nice too.

