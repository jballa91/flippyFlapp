import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "../../flippy-flapp-spa";
import { actions } from "../../store/flightPath";
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Modal,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "../../config";
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
}));

function SubmitPathForm({
  startPoint,
  endPoint,
  updateFLightPath,
  setShowForm,
}) {
  const classes = useStyles();
  const [optimizeByDistance, setOptimizeByDistance] = useState(true);
  const [optimizeByStops, setOptimizeByStops] = useState(false);
  const [flightPlanName, setFlightPlanName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showSaveFlight, setShowSaveFlight] = useState(false);

  const dispatch = useDispatch();
  const { user, getTokenSilently } = useAuth0();
  const flightPath = useSelector((state) => state.flightPath.flightPath || []);

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
    console.log("click");
    //get start/end from props

    //send dispatch to populate flight path in store
    updateFLightPath(optimizeByDistance, optimizeByStops, user, token);
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
      console.log(data.id);
      airportIds.push(data.id);
    }

    console.log(airportIds);
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
    console.log(data);
    console.log(flightPath);

    const flightPlanData = await fetch(`${api}/flightplans/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const flightPlan = await flightPlanData.json();
    console.log(flightPlan);

    // updateFLightPath(optimizeByDistance, optimizeByStops, user, token);
    //if yes
    // show form
    //if no
    // dispatch to populate flight path in store
    //show form
  }

  function resetStartAndEnd() {
    dispatch(actions.resetStartEnd());
  }

  return (
    <Box>
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
              id="standard-basic"
              label="Trip Name"
              onChange={(e) => setFlightPlanName(e.target.value)}
            />
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
          <Button
            variant="contained"
            onClick={previewFlightPlan}
            color="secondary"
          >
            Preview Flight Plan
          </Button>
          {flightPath.length ? (
            <Button
              variant="contained"
              onClick={saveFlightPlan}
              color="primary"
            >
              Save Flight Plan
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            onClick={resetStartAndEnd}
            color="primary"
          >
            Reset Points
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
}

export default SubmitPathForm;
