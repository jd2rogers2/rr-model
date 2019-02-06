class ApplicationController < ActionController::Base
  def fallback_index_html
    render :file => 'public/public/index.html'
    # where i got it from said this
    # render :file => 'public/index.html'
  end
end
