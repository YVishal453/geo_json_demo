class HomeController < ApplicationController

  def index
    cordinats = [params[:lat], params[:long]]
    radial_distance = params[:radial_distance]
  end

  def geo_json_road_distance_poly(lat, lng, radial_distance, poly_points)
  end
  
end
