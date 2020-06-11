import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import { thunks as AiportStore } from '../../store/airports';
import { thunks as FlightPathStore } from '../../store/flightPath';

// Variables
let key = 'AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ'
const myLocation = { // CN Tower Landmark
    lat: 32.755489,
    lng: -97.330765
};
// styles
const mapStyles = {
    width: '100%',
    height: '400px',
};

function GoogleMaps({ airports, updateAirportCoords, flightPath, updateFLightPath }) {
    // refs
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const infoWindow = useRef(null);
    let startButtonPressed = false;
    let endButtonPressed = false;

    // helper functions
    function createDomNode(airport) {
        //div containing all info in the popup
        const infoWindowDiv = document.createElement('div');
        infoWindowDiv.innerHTML = `<div>Name: ${airport.data.name}</div>`;

        //button to add start of flight path
        const addStartButton = document.createElement('button');
        addStartButton.innerHTML = 'Add to Start';
        debugger;
        if (startButtonPressed) {
            console.log('1: here')
            addStartButton.setAttribute('style', 'display:none')
        }
        addStartButton.addEventListener('click', () => {
            // set start coords to redux store
            console.log('Add Button Works')
            addStartButton.setAttribute('style', 'display:none')


            startButtonPressed = true;
            console.log(startButtonPressed);
        })
        infoWindowDiv.appendChild(addStartButton);

        //button to add end of flight path
        const addEndButton = document.createElement('button')
        addEndButton.innerHTML = 'Add to End'
        if (endButtonPressed) {
            console.log('2: here')
            addEndButton.setAttribute('style', 'display:none')
        }
        addEndButton.addEventListener('click', () => {

            console.log('End button works')
            addEndButton.setAttribute('style', 'display:none')
            endButtonPressed = true;
            console.log(endButtonPressed)
        })
        infoWindowDiv.appendChild(addEndButton);

        //button to reset start and end of flight path
        const resetButton = document.createElement('button')
        resetButton.innerHTML = 'Reset Start and End'
        resetButton.addEventListener('click', () => {
            //reset coords in redux store
            console.log('reset button works')
            addStartButton.setAttribute('style', 'display:inline-block')
            addEndButton.setAttribute('style', 'display:inline-block')
            startButtonPressed = false;
            endButtonPressed = false;
        })
        infoWindowDiv.appendChild(resetButton)

        return infoWindowDiv
    }

    const createGoogleMap = () =>
        new window.google.maps.Map(googleMapRef.current, {
            zoom: 14,
            center: {
                lat: myLocation.lat,
                lng: myLocation.lng
            }
        });

    const createMarker = () => {
        infoWindow.current = new window.google.maps.InfoWindow({ content: '<div></div>' });
        // create markers
        let markers = airports.map(airport => {
            let marker = new window.google.maps.Marker({ position: { lat: parseFloat(airport.lat), lng: parseFloat(airport.lng) }, map: googleMap.current });

            marker.addListener('click', async function (e) {
                //rendering multiple windows because creating a new window obj for each marker

                const markerLat = e.latLng.lat()
                const markerLng = e.latLng.lng()

                const data = { lat: markerLat, lng: markerLng }
                const airportData = await fetch('http://localhost:5000/airports/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                const airport = await airportData.json()
                infoWindow.current.setContent(createDomNode(airport))
                console.log(markerLat, markerLng)
                console.log(airport.data)


                infoWindow.current.open(googleMap.current, marker);
            });

            return marker;
        })

        var markerCluster = new window.MarkerClusterer(googleMap.current, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    }

    async function getAirportCoords() {
        updateAirportCoords();
        updateFLightPath();
    }


    // useEffect Hook

    useEffect(() => {
        console.log(airports.length)

        if (airports.length > 0) {
            createMarker()

        } else if (airports.length == 0) {
            const googleMapScript = document.createElement('script');
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
            window.document.body.appendChild(googleMapScript);

            //clusterer add on
            const clustererScript = document.createElement('script');
            clustererScript.src = 'https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js';
            window.document.body.appendChild(clustererScript)

            googleMapScript.addEventListener('load', () => {

                googleMap.current = createGoogleMap();

                getAirportCoords()
            })

        }
    }, [JSON.stringify(airports)]);

    useEffect(() => {
        console.log('2nd use effect')
        if (flightPath.length > 0) {
            let flightPathPoly = new window.google.maps.Polyline({
                path: flightPath,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            console.log()
            flightPathPoly.setMap(googleMap.current);
        }
    }, [JSON.stringify(flightPath)])

    return (
        <div
            id="google-map"
            ref={googleMapRef}
            style={mapStyles}
        />
    )

}

// GoogleMaps.defaultProps = {
//     airports: []
// }

const mapStateToProps = state => {
    return {
        airports: state.airports.airports || [],
        flightPath: state.flightPath.flightPath || []
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAirportCoords: () => dispatch(AiportStore.updateAirportCoords()),
        updateFLightPath: () => dispatch(FlightPathStore.updateFLightPath())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps)
