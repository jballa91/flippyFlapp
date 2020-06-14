import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, FormHelperText } from "@material-ui/core";
import SubmitPathForm from "./submitPathForm";
import LocationInfo from "./locationInfo";
import { thunks as FlightPathStoreThunks } from "../../store/flightPath";
import FlightPlanForm from "./flightPlanForm";

import LocalGasStationRoundedIcon from "@material-ui/icons/LocalGasStationRounded";

const useStyles = makeStyles((theme) => ({
  points_info: {
    margin: "15px 10px",
  },
  waypoint_info: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  waypoint_info_container: {
    margin: "15px 10px",
  },
  waypoint_info__data_row_a: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.secondary.light,
  },
  waypoint_info__data_row_b: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  waypoint_info__table: {
    border: `2px solid ${theme.palette.secondary.dark}`,
  },
  waypoint_info__title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function SubmitPath({
  startPoint,
  endPoint,
  updateFLightPath,
  flightPath,
  selectedAirplane,
  updateFLightPathObjs,
  flightPathObjs,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.points_info}>
      {startPoint.name ? (
        <LocationInfo place={startPoint} title={"Starting Point"} />
      ) : (
        <></>
      )}
      {flightPathObjs.length > 2 ? (
        flightPathObjs.map((point, i) => (
          <Box className={classes.waypoint_info} key={i}>
            {i !== 0 && i !== flightPathObjs.length - 1 ? (
              () => (
                <Box className={classes.waypoint_info_container}>
                  <Box className={classes.waypoint_info__title}>
                    <Typography variant="h6">Waypoint {i}</Typography>
                    <LocalGasStationRoundedIcon />
                  </Box>
                  <Box className={classes.waypoint_info__table}>
                    <Box className={classes.waypoint_info__data_row_a}>
                      <Typography>Name</Typography>
                      <Typography>{point.name}</Typography>
                    </Box>
                    <Box className={classes.waypoint_info__data_row_b}>
                      <Typography>Latitude</Typography>
                      <Typography>{point.lat}</Typography>
                    </Box>
                    <Box className={classes.waypoint_info__data_row_a}>
                      <Typography>Longitude</Typography>
                      <Typography>{point.lon}</Typography>
                    </Box>
                    <Box className={classes.waypoint_info__data_row_b}>
                      <Typography>Location</Typography>
                      <Typography>{`${point.city}, ${point.state}`}</Typography>
                    </Box>
                  </Box>
                </Box>
              )
            ) : (
              <></>
            )}
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
    flightPathObjs: state.flightPath.flightPathObjs || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFLightPath: (bool1, bool2, userId, token) =>
      dispatch(
        FlightPathStoreThunks.updateFLightPath(bool1, bool2, userId, token)
      ),
    updateFlightPathObjs: (token) =>
      dispatch(FlightPathStoreThunks.updateFlightPathObjs(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPath);
