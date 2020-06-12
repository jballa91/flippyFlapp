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


function FlightPlanForm({ setShowForm }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const classes = useStyles();

    return (
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
    )
}

export default FlightPlanForm
