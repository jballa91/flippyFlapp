import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { thunks as AirportStore } from "../../store/airports";
import {
  thunks as FlightPathStoreThunks,
  actions as FlightPathStoreActions,
} from "../../store/flightPath";
import { api } from "../../config";

import "./mapInfoWindow.css";

let key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";

let myLocation = {};

window.initMap = () => {};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    myLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  });
} else {
  myLocation = {
    lat: 32.755489,
    lng: -97.339765,
  };
}

const mapStyles = {
  width: "inherit",
  height: "inherit",
};

let GoogleMaps = ({
  airports,
  updateAirportCoords,
  flightPath,
  setStartPoint,
  setEndPoint,
  resetStartEnd,
}) => {
  let googleMapRef = React.createRef();
  let googleMap = useRef(null);
  useEffect(() => {
    let script = window.document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
    script.async = true;
    window.document.body.appendChild(script);

    script.addEventListener("load", () => {
      googleMapRef.current = createGoogleMap();
    });
  }, []);

  const createGoogleMap = () => {
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: { ...myLocation },
    });
  };

  return <div id="google-map" ref={googleMapRef} style={mapStyles} />;
};

const mapStateToProps = (state) => {
  return {
    airports: state.airports.airports || [],
    flightPath: state.flightPath.flightPath || [],
    startPoint: state.flightPath.startPoint || {},
    endPoint: state.flightPath.endPoint || {},
    showEnd: state.flightPath.endButtonPressed || false,
    showStart: state.flightPath.startButtonPressed || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStartPoint: (value) =>
      dispatch(FlightPathStoreActions.setStartPoint(value)),
    setEndPoint: (value) => dispatch(FlightPathStoreActions.setEndPoint(value)),
    setStart: (value) => dispatch(FlightPathStoreActions.setStart(value)),
    setEnd: (value) => dispatch(FlightPathStoreActions.setEnd(value)),
    resetStartEnd: () => dispatch(FlightPathStoreActions.resetStartEnd()),
    resetFlightPath: () => dispatch(FlightPathStoreActions.resetFlightPath()),
    updateAirportCoords: () => dispatch(AirportStore.updateAirportCoords()),
    updateFlightPath: () => dispatch(FlightPathStoreThunks.updateFlightPath()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
