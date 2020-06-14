import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@material-ui/icons/FlightLandRounded";

const useStyles = makeStyles((theme) => ({
  location_info_container: {
    display: "flex",
    flexDirection: "column",
    margin: "15px 10px",
  },
  location_info__data_row_a: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.secondary.light,
  },
  location_info__data_row_b: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  location_info__table: {
    border: `2px solid ${theme.palette.secondary.dark}`,
  },
  location_info__title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info_icon: {
    marginBottom: "-2px",
  },
}));

function LocationInfo({ place, title }) {
  const classes = useStyles();

  return (
    <Box className={classes.location_info_container}>
      <Box className={classes.location_info__title}>
        <Typography variant="h6">{title}</Typography>
        {title === "Starting Point" ? (
          <FlightTakeoffRoundedIcon className={classes.info_icon} />
        ) : (
          <FlightLandRoundedIcon className={classes.info_icon} />
        )}
      </Box>
      <Box className={classes.location_info__table}>
        <Box className={classes.location_info__data_row_a}>
          <Typography>Name</Typography>
          <Typography>{place.name}</Typography>
        </Box>
        <Box className={classes.location_info__data_row_b}>
          <Typography>Latitude</Typography>
          <Typography>{place.lat}</Typography>
        </Box>
        <Box className={classes.location_info__data_row_a}>
          <Typography>Longitude</Typography>
          <Typography>{place.lon}</Typography>
        </Box>
        <Box className={classes.location_info__data_row_b}>
          <Typography>Location</Typography>
          <Typography>{` ${place.city}, ${place.state}`}</Typography>
        </Box>
      </Box>
      {/* <Box className={classes.location_info__data_row}>
        <Typography>Fuel Types</Typography>
        <Typography>Fuel Types</Typography>
      </Box> */}
    </Box>
  );
}

export default LocationInfo;
