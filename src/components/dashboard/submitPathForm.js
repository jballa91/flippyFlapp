import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "../../flippy-flapp-spa";
import { actions, thunks } from "../../store/flightPath";
import { thunks as flightPlanThunks } from '../../store/flightPlans'
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "../../config";
import Errors from "./errors";

const useStyles = makeStyles((theme) => ({
  flight_plan_form_container: {
    backgroundColor: "white",
    height: "50%",
    width: "50%",
    display: "flex",
  },
  form__content: {
    display: "flex",
    flexDirection: "column",
  },
  form__data_row: {
    width: "100%",
  },
  form__data_row_buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  form: {
    margin: theme.spacing(1),
  },
  form__input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  form__save_button: {
    backgroundColor: theme.palette.success.light,
  },
}));

function SubmitPathForm({ updateFLightPath, setShowForm }) {
  const classes = useStyles();
  const [optimizeByDistance, setOptimizeByDistance] = useState(true);
  const [optimizeByStops, setOptimizeByStops] = useState(false);
  const [flightPlanName, setFlightPlanName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const { user, getTokenSilently } = useAuth0();
  const flightPath = useSelector((state) => state.flightPath.flightPath || []);
  // const flightPathObjs = useSelector(
  //   (state) => state.flightPath.flightPathObjs || []
  // );

  function distanceOnChange() {
    setOptimizeByDistance(!optimizeByDistance);
    setOptimizeByStops(!optimizeByStops);
  }

  function stopsOnChange() {
    setOptimizeByDistance(!optimizeByDistance);
    setOptimizeByStops(!optimizeByStops);
  }

  async function previewFlightPlan() {
    const token = await getTokenSilently();
    //get start/end from props

    //send dispatch to populate flight path in store
    updateFLightPath(optimizeByDistance, optimizeByStops, user, token);
    thunks.updateFlightPathObjs(token);
    //change polyline on map
  }

  async function saveFlightPlan() {
    const token = await getTokenSilently();
    const airportIds = [];

    for (let i = 0; i < flightPath.length; i++) {
      const airport = flightPath[i];
      const airportData = await fetch(`${api}/airports/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lat: airport.lat, lng: airport.lng }),
      });

      const { data } = await airportData.json();
      airportIds.push(data.id);
    }

    const data = {
      startYear: startDate.getFullYear(),
      startMonth: startDate.getMonth() + 1,
      startDay: startDate.getDate(),
      startHour: startDate.getHours(),
      startMinute: startDate.getMinutes(),
      endYear: endDate.getFullYear(),
      endMonth: endDate.getMonth() + 1,
      endDay: endDate.getDate(),
      endHour: endDate.getHours(),
      endMinute: endDate.getMinutes(),
      name: flightPlanName,
      route: airportIds,
      user_id: user.id,
    };

    const flightPlanData = await fetch(`${api}/flightplans/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const flightPlan = await flightPlanData.json();
    if (!flightPlan.errors) {
      dispatch(flightPlanThunks.updateFLightPlans(user, token));
      dispatch(actions.resetStartEnd())
    } else {
      setErrors(flightPlan.errors);
    }

    // updateFLightPath(optimizeByDistance, optimizeByStops, user, token);
    //if yes
    // show form
    //if no
    // dispatch to populate flight path in store
    //show form
  }

  function resetStartAndEnd() {
    // dispatch(actions.resetFlightPathObjs())
    dispatch(actions.resetStartEnd());
  }

  return (
    <Box className={classes.form}>
      {errors ? <Errors errors={errors} /> : <></>}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={optimizeByDistance} onChange={distanceOnChange} />
          }
          label="Optimize by Distance"
        />
        <FormControlLabel
          control={
            <Switch checked={optimizeByStops} onChange={stopsOnChange} />
          }
          label="Optimize by Number of Landings"
        />
        <Box className={classes.form__content}>
          <Box className={classes.form__data_row}>
            <TextField
              required
              className={classes.form__input}
              id="standard-basic"
              label="Trip Name"
              onChange={(e) => setFlightPlanName(e.target.value)}
            />
          </Box>
          <Box className={classes.form__data_row}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className={classes.form__input}
                value={startDate}
                onChange={setStartDate}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className={classes.form__input}
                value={endDate}
                onChange={setEndDate}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Box>
        <Box className={classes.form__data_row_buttons}>
          <Button
            variant="contained"
            onClick={previewFlightPlan}
            color="secondary"
          >
            Preview Plan
          </Button>
          <Button
            variant="contained"
            onClick={resetStartAndEnd}
            color="primary"
          >
            Reset Points
          </Button>
        </Box>
        {flightPath.length ? (
          <Button
            className={classes.form__save_button}
            variant="contained"
            onClick={saveFlightPlan}
          >
            Save Flight Plan
          </Button>
        ) : (
            <></>
          )}
      </FormGroup>
    </Box>
  );
}

export default SubmitPathForm;
