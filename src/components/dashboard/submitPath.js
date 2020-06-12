import React, { useState } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import SubmitPathForm from './submitPathForm';
import LocationInfo from './locationInfo';

const useStyles = makeStyles((theme) => ({

}));

function SubmitPath({ startPoint, endPoint }) {
    return (
        <>
            {startPoint.name ? <LocationInfo place={startPoint} title={'Starting Point'} /> : <></>}
            {endPoint.name ? <LocationInfo place={endPoint} title={'Ending Point'} /> : <></>}
            {startPoint.name && endPoint.name ? <SubmitPathForm /> : <></>}
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPath);
