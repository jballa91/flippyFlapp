import React, { useEffect, useState } from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMap from "react-google-map";
import GoogleMap from "google-map-react";

import { Box } from "@material-ui/core";
import Marker from "./Marker";

import { connect } from "react-redux";
import { thunks as AiportStore } from "../../store/airports";
import { api } from "../../config";
import {
  thunks as FlightPathStoreThunks,
  actions as FlightPathStoreActions,
} from "../../store/flightPath";

const GoogleMaps = ({ airports, updateAirportCoords }) => {
  let [myLocation, setMyLocation] = useState({});

  useEffect(() => {
    // if (navigator.geolocation) {
    //   window.navigator.geolocation.getCurrentPosition((position) => {
    //     setMyLocation({
    //       lat: parseFloat(position.coords.latitude),
    //       lng: parseFloat(position.coords.longitude),
    //     });
    //   });
    // } else {
    //   setMyLocation({
    //     lat: 32.755489,
    //     lng: -97.330765,
    //   });
    // }
    updateAirportCoords();
  }, [JSON.stringify(airports)]);
  const markers =
    airports &&
    airports.map((airport) => {
      return { lat: airport.lat, lng: airport.lng };
    });
  return (
    <ReactGoogleMapLoader
      params={{
        key: "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ",
        libraries: "places",
      }}
      render={(googleMaps) =>
        googleMaps && (
          <div style={{ height: "100%", width: "100%" }}>
            <GoogleMap
              googleMaps={googleMaps}
              center={{
                // navigator.geolocation
                //   ? navigator.geolocation.getCurrentPosition((position) => ({
                //       lat: position.coords.latitude,
                //       lng: position.coords.longitude,
                //     }))
                //   : {
                lat: 32.755489,
                lng: -97.330765,
              }}
              zoom={8}
              yesIWantToUseGoogleMapApiInternals={true}
            >
              {airports.map((airport) => (
                <Marker
                  lat={airport.lat}
                  lng={airport.lng}
                  text={airport.name}
                />
              ))}
            </GoogleMap>
          </div>
        )
      }
    />
  );
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
    updateAirportCoords: () => dispatch(AiportStore.updateAirportCoords()),
    updateFlightPath: () => dispatch(FlightPathStoreThunks.updateFlightPath()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
