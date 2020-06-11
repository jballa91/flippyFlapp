import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { thunks as AiportStore } from "../../store/airports";
import { thunks as FlightPathStore } from "../../store/flightPath";

// Variables
let key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";
const myLocation = {
  // CN Tower Landmark
  lat: 32.755489,
  lng: -97.330765,
};
// styles
const mapStyles = {
  width: "inherit",
  height: "inherit",
};

function GoogleMaps({
  airports,
  updateAirportCoords,
  flightPath,
  updateFLightPath,
}) {
  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);

  // helper functions
  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
    });

  const createMarker = () => {
    let markers = airports.map((airport) => {
      return new window.google.maps.Marker({
        position: {
          lat: parseFloat(airport.lat),
          lng: parseFloat(airport.lng),
        },
        map: googleMap.current,
      });
    });
    console.log(markers);
    var markerCluster = new window.MarkerClusterer(googleMap.current, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
    console.log(markerCluster);
  };

  async function getAirportCoords() {
    updateAirportCoords();
    updateFLightPath();
  }

  // useEffect Hook

  useEffect(() => {
    console.log(airports.length);

    if (airports.length > 0) {
      createMarker();
    } else if (airports.length == 0) {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
      window.document.body.appendChild(googleMapScript);

      //clusterer add on
      const clustererScript = document.createElement("script");
      clustererScript.src =
        "https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js";
      window.document.body.appendChild(clustererScript);

      googleMapScript.addEventListener("load", () => {
        googleMap.current = createGoogleMap();

        getAirportCoords();
      });
    }
  }, [JSON.stringify(airports)]);

  useEffect(() => {
    console.log("2nd use effect");
    if (flightPath.length > 0) {
      let flightPathPoly = new window.google.maps.Polyline({
        path: flightPath,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      console.log();
      flightPathPoly.setMap(googleMap.current);
    }
  }, [JSON.stringify(flightPath)]);

  return <div id="google-map" ref={googleMapRef} style={mapStyles} />;
}

// GoogleMaps.defaultProps = {
//     airports: []
// }

const mapStateToProps = (state) => {
  return {
    airports: state.airports.airports || [],
    flightPath: state.flightPath.flightPath || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAirportCoords: () => dispatch(AiportStore.updateAirportCoords()),
    updateFLightPath: () => dispatch(FlightPathStore.updateFLightPath()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps);
