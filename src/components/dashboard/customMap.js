import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import { thunks } from '../../store/airports'

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

function GoogleMaps(props) {
    // refs
    const googleMapRef = React.createRef();
    const googleMap = useRef(null);
    const marker = useRef(null);
    const [airports, setAirports] = useState([])
    const [flightPath, setFlightPath] = useState([])

    // helper functions
    const createGoogleMap = () =>
        new window.google.maps.Map(googleMapRef.current, {
            zoom: 14,
            center: {
                lat: myLocation.lat,
                lng: myLocation.lng
            }
        });

    const createMarker = () => {
        //create clusterer obj
        // var clusterer = new window.Clusterer(googleMap);

        console.log(airports.length)
        let markers = airports.map(airport => {
            return new window.google.maps.Marker({ position: { lat: parseFloat(airport.lat), lng: parseFloat(airport.lng) }, map: googleMap.current })
        })
        console.log(markers)
        var markerCluster = new window.MarkerClusterer(googleMap.current, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        console.log(markerCluster)
    }

    async function getAirportCoords() {

        const airportData = await fetch('http://localhost:5000/airports/coords')
        const { data } = await airportData.json()

        const revisedlist = data.map(airport => {
            console.log('airport', airport)
            return {
                lat: parseFloat(airport.lat),
                lng: parseFloat(airport.lng),
                id: airport.id
            }
        })

        setAirports(revisedlist)
        console.log(revisedlist)
        console.log(airports)
        //change later ----------------------------------------------------
        setFlightPath([
            { lat: 27.074498333081777, lng: -81.58646666706443 },
            { lat: 32.46383333285225, lng: -87.95405555602503 },
            { lat: 37.09399999968052, lng: -95.57200000004723 },
            { lat: 40.614964639338744, lng: -103.26428550007884 },
            { lat: 44.16236111118097, lng: -112.22066666743004 },
            { lat: 46.374500000137566, lng: -117.01538888899674 }
        ]);
    }


    // useEffect Hook
    useEffect(() => {
        props.updateAirportCoords()
        if (airports.length > 0) {
            createMarker()
            // if (flightPath.length > 0) {
            //     let flightPathPoly = new window.google.maps.Polyline({
            //         path: flightPath,
            //         geodesic: true,
            //         strokeColor: '#FF0000',
            //         strokeOpacity: 1.0,
            //         strokeWeight: 2
            //     });
            //     console.log()
            //     flightPathPoly.setMap(googleMap.current);
            // }
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
                // marker.current =
                getAirportCoords()
            })

        }
    }, [airports, flightPath]);

    return (
        <div
            id="google-map"
            ref={googleMapRef}
            style={mapStyles}
        />
    )

}

const mapStateToProps = state => {
    return {
        airports: state.airports.airports
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAirportCoords: () => dispatch(thunks.updateAirportCoords())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMaps)
