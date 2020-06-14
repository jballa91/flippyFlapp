import React, { useState, useEffect } from "react";
import { api } from "../../config";
import { useDispatch, useSelector } from "react-redux";
function GoogleStaticMap({ flightPlan }) {
  const flightPath = useSelector((state) => state.flightPath.flightPath || []);

  useEffect(() => {
    if (flightPlan) {
      setCoordsForUrl(getAirportCoordUrl(flightPlan));
    }
  }, []);

  const key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";
  return (
    <img
      src={`http://maps.google.com/maps/api/staticmap?size=220x180&zoom=10&path=color:0xff0000ff|weight:5${coordsForUrl}&markers=color%3ablue|label%3aS${coordsForUrl}&sensor=false&key=${key}`}
      alt={"Google Map"}
    />
  );
}

export default GoogleStaticMap;
