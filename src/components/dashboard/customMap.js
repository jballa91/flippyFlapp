import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { thunks as AiportStore } from "../../store/airports";
import { api } from "../../config";
import {
  thunks as FlightPathStoreThunks,
  actions as FlightPathStoreActions,
} from "../../store/flightPath";
import "./mapInfoWindow.css";
// Variables
let key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";
let myLocation = {};
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async function (position) {
    myLocation = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };
  });
} else {
  myLocation = {
    // CN Tower Landmark
    lat: 32.755489,
    lng: -97.330765,
  };
}
// styles
const mapStyles = {
  width: "inherit",
  height: "inherit",
};

function GoogleMaps({
  airports,
  updateAirportCoords,
  flightPath,
  setStartPoint,
  setEndPoint,
  resetStartEnd,
  startPoint,
  endPoint,
}) {
  // refs
  const googleMapRef = React.createRef();
  console.log(googleMapRef)
  const googleMap = useRef(null);
  const infoWindow = useRef(null);
  const Polyline = useRef(null);
  // let startButtonPressed = false;
  // let endButtonPressed = false;
  const addStartButton = useRef(null);
  const addEndButton = useRef(null);

  useEffect(() => {
    // || startPoint.name || endPoint.name
    if (Polyline.current) {
      Polyline.current.setMap(null);
      // setStartPoint({});
      // setEndPoint({});
      // startButtonPressed = false;
      // endButtonPressed = false;

      // infoWindow.current = new window.google.maps.InfoWindow({
      //   content: '<div></div>',
      // });
      // addStartButton.current.setAttribute('style', 'display:inline-block');
      // addEndButton.current.setAttribute('style', 'display:inline-block');
    }
    if (flightPath.length > 0) {
      if (Polyline.current) {
        Polyline.current.setMap(null);
        // setStartPoint({});
        // setEndPoint({});
        // startButtonPressed = false;
        // endButtonPressed = false;
      }
      Polyline.current = new window.google.maps.Polyline({
        path: flightPath,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      Polyline.current.setMap(googleMap.current);
    }
  }, [JSON.stringify(flightPath)]);

  useEffect(() => {
    (async () => {
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
  
        googleMapScript.addEventListener("load", async () => {
          googleMap.current = await createGoogleMap();
  
          getAirportCoords();
        });
      }
    })();
  }, [JSON.stringify(airports)]);
  // helper functions
  function createDomNode(airport) {
    //div containing all info in the popup
    const infoWindowDiv = document.createElement("div");
    infoWindowDiv.innerHTML = `
    <div class="info-window">
        <div class="info-window__top-info info-window__section">
            <div class="info-window__section-title">
                <div>${airport.data.name}</div>
            </div>
            <div><b>location:</b> ${airport.data.city}, ${
      airport.data.state
    }</div>
            <div><b>lat, lng:</b> ${parseFloat(airport.data.lat)}, ${
      parseFloat(airport.data.lon)
    })</div>
        </div>

        <div class="info-window__middle-info info-window__section">
            <div class="info-window__section-title">
                <div>Airport Info</div>
            </div>
            <div><b>Location Id:</b> ${airport.data.loc_id}</div>
            <div><b>CTAF:</b> ${airport.data.ctaf || "None"}</div>
            <div><b>Sectional Chart:</b> ${airport.data.sectional_chart}</div>
            <div><b>Eleveation:</b> ${airport.data.elevation}</div>
            <div><b>ATC Tower:</b> ${airport.data.atc_tower || "None"}</div>
            <div><b>Landing Fee:</b> ${airport.data.landing_fee || "None"}</div>
        </div>

        <div class="info-window__bottom-info info-window__section">
            <div class="info-window__section-title">
                <div>Contact Info</div>
            </div>
            <div><b>FSS Phone Number</b>: ${
              airport.data.fss_phone_number || "None"
            }</div>
            <div><b>Manager Name:</b> ${airport.data.manager_name}</div>
            <div><b>Manager Phone Number:</b> ${
              airport.data.manager_phone_number
            }</div>
        </div>
    </div>
    `;

    //button to add start of flight path
    addStartButton.current = document.createElement("button");
    addStartButton.current.innerHTML = "Add to Start";

    addStartButton.current.addEventListener("click", () => {
      // set start coords to redux store
      setStartPoint(airport.data);
      // addStartButton.current.setAttribute('style', 'display:none')

      // startButtonPressed = true;
    });
    infoWindowDiv.appendChild(addStartButton.current);

    //button to add end of flight path
    addEndButton.current = document.createElement("button");
    addEndButton.current.innerHTML = "Add to End";

    addEndButton.current.addEventListener("click", () => {
      setEndPoint(airport.data);
      // addEndButton.current.setAttribute('style', 'display:none')
      // endButtonPressed = true;
    });
    infoWindowDiv.appendChild(addEndButton.current);

    //button to reset start and end of flight path
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset Start and End";
    resetButton.addEventListener("click", () => {
      //reset coords in redux store
      resetStartEnd();
      addStartButton.current.setAttribute("style", "display:inline-block");
      addEndButton.current.setAttribute("style", "display:inline-block");
    });
    infoWindowDiv.appendChild(resetButton);

    return infoWindowDiv;
  }

  const createGoogleMap = async () =>
    await new window.google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: {
        lat: parseFloat(myLocation.lat),
        lng: parseFloat(myLocation.lng),
      },
    });

  const createMarker = async () => {
    infoWindow.current = await new window.google.maps.InfoWindow({
      content: "<div></div>",
    });
    // create markers
    let markers = airports.map(async (airport) => {
      let marker = await new window.google.maps.Marker({
        position: {
          lat: parseFloat(airport.lat),
          lng: parseFloat(airport.lng),
        },
        map: googleMap.current,
      });

      marker.addListener("click", async function (e) {
        //rendering multiple windows because creating a new window obj for each marker

        const markerLat = e.latLng.lat();
        const markerLng = e.latLng.lng();

        const data = { lat: parseFloat(markerLat), lng: parseFloat(markerLng) };
        const airportData = await fetch(`${api}/airports/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const airport = await airportData.json();
        infoWindow.current.setContent(createDomNode(airport));

        infoWindow.current.open(googleMap.current, marker);
      });

      return marker;
    });

    new window.MarkerClusterer(googleMap.current, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
  };

  async function getAirportCoords() {
    updateAirportCoords();
    // updateFlightPath();
  }
  return <div id="google-map" ref={googleMapRef.current} style={mapStyles} />;
}

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
