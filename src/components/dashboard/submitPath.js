import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, FormHelperText } from "@material-ui/core";
import SubmitPathForm from "./submitPathForm";
import LocationInfo from "./locationInfo";
import { thunks as FlightPathStoreThunks } from "../../store/flightPath";
import FlightPlanForm from "./flightPlanForm";

const useStyles = makeStyles((theme) => ({
  points_info: {
    margin: theme.spacing(3),
  },
  waypoint_info: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  wapoint_info_row: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function SubmitPath({
  startPoint,
  endPoint,
  updateFLightPath,
  flightPath,
  selectedAirplane,
}) {
  const classes = useStyles();
  console.log("INFO YOU ARE LOOKING FOR:", startPoint, endPoint, flightPath);
  return (
    <Box className={classes.points_info}>
      {startPoint.name ? (
        <LocationInfo place={startPoint} title={"Starting Point"} />
      ) : (
        <></>
      )}
      {flightPath.length > 0 ? (
        flightPath.map((point, i) => (
          <Box className={classes.waypoint_info}>
            <Typography variant="h6">{i + 1}</Typography>
            <Box className={classes.waypoint_info_row}>
              <Typography>Latitude</Typography>
              <Typography>{point.lat}</Typography>
            </Box>
            <Box className={classes.waypoint_info_row}>
              <Typography>Longitude</Typography>
              <Typography>{point.lng}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <></>
      )}
      {endPoint.name ? (
        <LocationInfo
          className={classes.location_info}
          place={endPoint}
          title={"Ending Point"}
        />
      ) : (
        <></>
      )}
      {startPoint.name && endPoint.name && selectedAirplane.name ? (
        <SubmitPathForm
          startPoint={startPoint}
          endPoint={endPoint}
          updateFLightPath={updateFLightPath}
          flightPath={flightPath}
        />
      ) : (
        <Box className={classes.points_info}>
          Please select an airplane, startingPoint, and endPoint to preview the
          flight path
        </Box>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    startPoint: state.flightPath.startPoint || {},
    endPoint: state.flightPath.endPoint || {},
    flightPath: state.flightPath.flightPath || {},
    selectedAirplane: state.airplanes.selectedAirplane || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFLightPath: (bool1, bool2, userId, token) =>
      dispatch(
        FlightPathStoreThunks.updateFLightPath(bool1, bool2, userId, token)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPath);
