import React, { useState } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import SubmitPathForm from './submitPathForm';
import LocationInfo from './locationInfo';
import {
    thunks as FlightPathStoreThunks,
} from "../../store/flightPath";
const useStyles = makeStyles((theme) => ({

}));

function SubmitPath({ startPoint, endPoint, updateFLightPath }) {
    return (
        <>
            {startPoint.name ? <LocationInfo place={startPoint} title={'Starting Point'} /> : <></>}
            {endPoint.name ? <LocationInfo place={endPoint} title={'Ending Point'} /> : <></>}
            {startPoint.name && endPoint.name ? <SubmitPathForm startPoint={startPoint} endPoint={endPoint} updateFLightPath={updateFLightPath} /> : <></>}
        </>

    )
}

const mapStateToProps = state => {
    return {
        startPoint: state.flightPath.startPoint || {},
        endPoint: state.flightPath.endPoint || {},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFLightPath: () => dispatch(FlightPathStoreThunks.updateFLightPath()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPath);
