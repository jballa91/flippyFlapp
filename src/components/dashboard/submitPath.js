import React, { useState } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";

import SubmitPathForm from './submitPathForm';
import LocationInfo from './locationInfo';
import {
    thunks as FlightPathStoreThunks,
} from "../../store/flightPath";
import FlightPlanForm from './flightPlanForm';

const useStyles = makeStyles((theme) => ({

}));

function SubmitPath({ startPoint, endPoint, updateFLightPath, flightPath }) {
    return (
        <>
            {startPoint.name ? <LocationInfo place={startPoint} title={'Starting Point'} /> : <></>}
            {endPoint.name ? <LocationInfo place={endPoint} title={'Ending Point'} /> : <></>}
            {startPoint.name && endPoint.name ? <SubmitPathForm startPoint={startPoint} endPoint={endPoint}
                updateFLightPath={updateFLightPath} flightPath={flightPath} />
                : <></>}
        </>

    )
}

const mapStateToProps = state => {
    return {
        startPoint: state.flightPath.startPoint || {},
        endPoint: state.flightPath.endPoint || {},
        flightPath: state.flightPath.flightPath || {},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFLightPath: () => dispatch(FlightPathStoreThunks.updateFLightPath()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPath);
