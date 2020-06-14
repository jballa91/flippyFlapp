import React, { useState, useEffect } from 'react';
import { api } from "../../config";
function GoogleStaticMap({ flightPlan }) {
    const [coordsForUrl, setCoordsForUrl] = useState('');
    async function getAirportCoordUrl(flightPath) {
        const airportCoords = '';
        for (let i = 0; i < flightPath.length; i++) {
            const airportId = flightPath.route[i];

            const airportData = await fetch(`${api}//airports/${airportId}`);
            const { data } = await airportData.json();

            airportCoords += `|${data.lat},${data.lon}`


        }
        return airportCoords;
    }

    useEffect(() => {
        console.log('use effect ran')
        if (flightPlan) {
            setCoordsForUrl(getAirportCoordUrl(flightPlan));
            console.log(coordsForUrl);
        }
    })


    const key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";
    return (
        <img src={`http://maps.google.com/maps/api/staticmap?size=220x180&zoom=10&path=color:0xff0000ff|weight:5${coordsForUrl}&markers=color%3ablue|label%3aS${coordsForUrl}&sensor=false&key=${key}`} alt={'Google Map'} />
    )
}

export default GoogleStaticMap;
