import React, { useEffect, useRef, useState } from "react";
let places = [
  { name: "Panda-Sycamore", lat: 32.62669, lng: -97.37 },
  { name: "Panda-Hulen", lat: 32.71106, lng: -97.38634 },
  { name: "Panda-TrinityCommons", lat: 32.68009, lng: -97.46404 },
  { name: "Panda-Benbrook", lat: 32.6798922, lng: -97.4635325 },
  { name: "Panda-Burleson", lat: 32.7134158, lng: -97.2831792 },
];
var flightPlanCoordinates = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
];
// Variables
let key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";
const myLocation = {
  // CN Tower Landmark
  lat: 32.755489,
  lng: -97.330765,
};
// styles
const mapStyles = {
  width: "100%",
  height: "400px",
};

function GoogleMaps(props) {
  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);
  const [airports, setAirports] = useState([]);
  const [flightPath, setFlightPath] = useState([]);

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
    //create clusterer obj
    // var clusterer = new window.Clusterer(googleMap);

    console.log(airports.length);
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
    const airportData = await fetch("http://localhost:5000/airports/coords");
    const { data } = await airportData.json();

    const revisedlist = data.map((airport) => {
      console.log("airport", airport);
      return {
        lat: parseFloat(airport.lat),
        lng: parseFloat(airport.lng),
        id: airport.id,
      };
    });

    setAirports(revisedlist);
    console.log(revisedlist);
    console.log(airports);
    //change later ----------------------------------------------------
    setFlightPath([
      { lat: 33.74772222164236, lng: -115.32524999993736 },
      { lng: -115.32524999993736, lat: 33.74772222164236 },
      { lat: 35.65874127804852, lng: -117.82953249991486 },
      { lat: 38.03041666684228, lng: -120.41455555606944 },
      { lat: 38.4400000002395, lng: -120.88694444435187 },

      // { lat: 27.074498333081777, lng: -81.58646666706443 },
      // { lat: 32.46383333285225, lng: -87.95405555602503 },
      // { lat: 37.09399999968052, lng: -95.57200000004723 },
      // { lat: 40.614964639338744, lng: -103.26428550007884 },
      // { lat: 44.16236111118097, lng: -112.22066666743004 },
      // { lat: 46.374500000137566, lng: -117.01538888899674 }
    ]);
  }

  // useEffect Hook
  useEffect(() => {
    if (airports.length > 0) {
      createMarker();
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
        // marker.current =
        getAirportCoords();
      });
    }
  }, [airports, flightPath]);

  return <div id="google-map" ref={googleMapRef} style={mapStyles} />;
}

export default GoogleMaps;
