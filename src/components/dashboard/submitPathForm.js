import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, FormGroup, FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

function SubmitPathForm({ startPoint, endPoint, updateFLightPath }) {
    const [optimizeByDistance, setOptimizeByDistance] = useState(true);
    const [optimizeByStops, setOptimizeByStops] = useState(false);

    function distanceOnChange() {
        setOptimizeByDistance(!optimizeByDistance);
        setOptimizeByStops(!optimizeByStops);
    }

    function stopsOnChange() {
        setOptimizeByDistance(!optimizeByDistance);
        setOptimizeByStops(!optimizeByStops);
    }

    function previewFlightPlan() {
        console.log('click');
        //get start/end from props

        //send dispatch to populate flight path in store
        updateFLightPath()
        //change polyline on map

    }

    function saveFlightPlan() {
        console.log('click');
        //check to see if flight path is in store
        //if yes
        // show form
        //if no
        // dispatch to populate flight path in store
        //show form

    }

    return (
        <Box>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={optimizeByDistance} onChange={distanceOnChange} />}
                    label="Optimize by Distance"
                />
                <FormControlLabel
                    control={<Switch checked={optimizeByStops} onChange={stopsOnChange} />}
                    label="Optimize by Number of Landings"
                />
                <Box>
                    <Button variant='contained' onClick={previewFlightPlan} color='secondary'>Preview Flight Plan</Button>
                    <Button variant='contained' onClick={saveFlightPlan} color='primary'>Save Flight Plan</Button>
                </Box>
            </FormGroup>
        </Box>
    )
}

export default SubmitPathForm
