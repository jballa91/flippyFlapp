import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    location_info_container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px 10px',
    },
    location_info__data_row: {
        display: 'flex',
    },
    location_info__title: {
        textAlign: 'center'
    },
}));

function LocationInfo({ place, title }) {
    const classes = useStyles();

    return (
        <Box className={classes.location_info_container}>
            <Box className={classes.location_info__title}>
                <Typography>{title}</Typography>
            </Box>
            <Box className={classes.location_info__data_row}>
                <Typography>Name:{' '}</Typography>
                <Typography>{place.name}</Typography>
            </Box>
            <Box className={classes.location_info__data_row}>
                <Typography>Coordinates: </Typography>
                <Typography>{` (${place.lat}, ${place.lon})`}</Typography>
            </Box>
            <Box className={classes.location_info__data_row}>
                <Typography>Location: </Typography>
                <Typography>{` ${place.city}, ${place.state}`}</Typography>
            </Box>
            <Box className={classes.location_info__data_row} >
                <Typography>Fuel Types: </Typography>
                <Typography>Fuel Types</Typography>
            </Box>
        </Box>
    )
}

export default LocationInfo;
