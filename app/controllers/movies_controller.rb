class MoviesController < ApplicationController
  def index
    pp params[:q]

    @query = Movie.ransack(params[:q])
    scope = @query.result(distinct: true).includes(:genres)

    set_default_sort

    @pagy, @movies = pagy(scope, items: 10)
  end

  protected

  def set_default_sort
    @query.sorts = 'year desc' if @query.sorts.empty?
  end
end
