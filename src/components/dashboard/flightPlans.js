import React, { useEffect, useState } from 'react';
import { GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, makeStyles } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "../../flippy-flapp-spa";
import { thunks } from '../../store/flightPlans';
import { api } from "../../config";
import GoogleStaticMap from './googleStaticMap';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function FlightPlans() {
    const classes = useStyles();
    const { user, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const flightPlans = useSelector(
        (state) => state.flightPlans.flightPlans || []
    );


    async function getToken() {
        const token = await getTokenSilently()
        dispatch(thunks.updateFLightPlans(user, token));
    }

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
        if (!flightPlans.length) {
            getToken()
        } else {

        }
    })




    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                {flightPlans.map(flightPlan => {
                    return (
                        <GridListTile key={flightPlan.id}>
                            <GoogleStaticMap />
                            <GridListTileBar
                                title={flightPlan.name}
                                subtitle={<span>by: {flightPlan.user_id}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${flightPlan.name}`} className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    )
                })}
            </GridList>
        </div>
    );

}

export default FlightPlans;
