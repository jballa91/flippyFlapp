import React, { useState } from 'react';
import { Box, Button, FormGroup, FormControlLabel, Switch, Modal, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    flight_plan_form_container: {
        backgroundColor: 'white',
        height: '50%',
        width: '50%',
        display: 'flex',
    },
    form__content: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

function SubmitPathForm({ startPoint, endPoint, updateFLightPath, flightPath, setShowForm }) {
    const classes = useStyles();
    const [optimizeByDistance, setOptimizeByDistance] = useState(true);
    const [optimizeByStops, setOptimizeByStops] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
        if (flightPath.length > 0) {
            setShowForm(true)
        }
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
                <Box className={classes.form__content}>
                    <Box className={classes.form__data_row}>
                        <TextField id="standard-basic" label="Trip Name" />
                    </Box>
                    <Box className={classes.form__data_row}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={startDate} onChange={setStartDate} />
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={endDate} onChange={setEndDate} />
                        </MuiPickersUtilsProvider>
                    </Box>
                </Box>
                <Box>
                    <Button variant='contained' onClick={previewFlightPlan} color='secondary'>Preview Flight Plan</Button>
                    <Button variant='contained' onClick={saveFlightPlan} color='primary'>Save Flight Plan</Button>
                </Box>
            </FormGroup>
        </Box>
    )
}

export default SubmitPathForm