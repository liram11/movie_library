# frozen_string_literal: true

class MoviesController < ApplicationController
  def index
    @query = Movie.ransack(filter_params)
    scope = @query.result(distinct: true).includes(:genres)

    set_default_sort

    @pagy, @movies = pagy(scope, items: 10)

    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  protected

  def filter_params
    if params[:q].present?
      filter_params = params[:q].permit(
        :title_cont,
        :year_eq,
        :s,
        genre_ids_cont_all: []
      )

      if filter_params[:genre_ids_cont_all]
        filter_params.merge({
                              genre_ids_cont_all: filter_params[:genre_ids_cont_all].map { |id| "|#{id}|" }
                            })
      else
        filter_params
      end
    else
      {}
    end
  end

  def set_default_sort
    @query.sorts = 'year desc' if @query.sorts.empty?
  end
end
