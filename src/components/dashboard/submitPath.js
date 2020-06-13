import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import SubmitPathForm from "./submitPathForm";
import LocationInfo from "./locationInfo";
import { thunks as FlightPathStoreThunks } from "../../store/flightPath";
import FlightPlanForm from "./flightPlanForm";

const useStyles = makeStyles((theme) => ({}));

function SubmitPath({ startPoint, endPoint, updateFLightPath, flightPath, selectedAirplane }) {
  return (
    <>
      {startPoint.name ? (
        <LocationInfo place={startPoint} title={"Starting Point"} />
      ) : (
          <></>
        )}
      {endPoint.name ? (
        <LocationInfo place={endPoint} title={"Ending Point"} />
      ) : (
          <></>
        )}
      {startPoint.name && endPoint.name && selectedAirplane.name ? (
        <SubmitPathForm
          startPoint={startPoint}
          endPoint={endPoint}
          updateFLightPath={updateFLightPath}
          flightPath={flightPath}
          updateFLightPath={updateFLightPath}
        />
      ) : (
          <Box>Please select an airplane, startingPoint, and endPoint to preview the flight path</Box>
        )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    startPoint: state.flightPath.startPoint || {},
    endPoint: state.flightPath.endPoint || {},
    flightPath: state.flightPath.flightPath || {},
    selectedAirplane: state.airplanes.selectedAirplane || {}
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
