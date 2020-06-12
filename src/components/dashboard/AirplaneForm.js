import React from "react";

import { api } from "../../config.js";

import { useAuth0 } from "../../flippy-flapp-spa";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form__container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: theme.zIndex.drawer + 30,
    backgroundColor: "white",
  },
  form__row: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form__multi_row: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form__item: {
    display: "flex",
    flexDirection: "column",
  },
  form__title: {
    color: "black",
    margin: theme.spacing(2),
  },
  form__text_input: {
    width: "100%",
  },
  form__number_input: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
  },
  form__fuel_type_input: {
    width: "45%",
  },
  form__submit: {
    width: "45%",
    backgroundColor: theme.palette.success.main,
    "&&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const AirplaneForm = (props) => {
  const classes = useStyles();

  const { user, getTokenSilently } = useAuth0();

  const [name, setName] = React.useState("");
  const [fuelLoad, setFuelLoad] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [takeOffUse, setTakeOffUse] = React.useState("");
  const [fuelUse, setFuelUse] = React.useState("");
  const [speed, setSpeed] = React.useState("");

  const closeForm = props.backdropClose;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getTokenSilently();
    const res = await fetch(`${api}/airplanes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        fuel_load: fuelLoad,
        fuel_consumption: fuelUse,
        speed: speed,
        start_taxi_takeoff_fuel_use: takeOffUse,
        user_id: user.id,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      console.log(result);
      closeForm();
    }
  };
  return (
    <form
      className={classes.form__container}
      onClick={(e) => handleClick(e)}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Box>
        <Typography className={classes.form__title} variant="h3">
          Create an Airplane
        </Typography>
      </Box>
      <Box className={classes.form__row}>
        <InputLabel htmlFor="airplane-name-input">Airplane Name</InputLabel>
        <Input
          className={classes.form__text_input}
          id="airplane-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="airplane-name-text"
          type="text"
          required
        />
      </Box>
      <Box className={classes.form__multi_row}>
        <Box className={classes.form__number_input}>
          <InputLabel htmlFor="airplane-fuel-load-input">Fuel Load</InputLabel>
          <Input
            id="airplane-fuel-load-input"
            value={fuelLoad}
            onChange={(e) => setFuelLoad(e.target.value)}
            aria-describedby="airplane-fuel-load-number"
            type="number"
            required
          />
        </Box>
        <FormControl className={classes.form__fuel_type_input}>
          <InputLabel shrink id="airplane-fuel-type-input">
            Fuel Type
          </InputLabel>
          <Select
            labelId="airplane-fuel-type-input"
            id="airplane-fuel-type-input"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            displayEmpty
            label="fuel_type"
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"A1"}>A1</MenuItem>
            <MenuItem value={"A1+"}>A1+</MenuItem>
            <MenuItem value={"100LL"}>100LL</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.form__multi_row}>
        <Box className={classes.form__number_input}>
          <InputLabel htmlFor="airplane-take-off-use-input">
            Start, Taxi, Take Off Fuel Use
          </InputLabel>
          <Input
            id="airplane-take-off-use-input"
            value={takeOffUse}
            onChange={(e) => setTakeOffUse(e.target.value)}
            aria-describedby="airplane-take-off-use-number"
            type="number"
            required
          />
        </Box>
        <Box className={classes.form__number_input}>
          <InputLabel htmlFor="airplane-fuel-use-input">
            Fuel Consumption (Gal/hr)
          </InputLabel>
          <Input
            id="airplane-fuel-use-input"
            value={fuelUse}
            onChange={(e) => setFuelUse(e.target.value)}
            aria-describedby="airplane-fuel-use-number"
            type="number"
            required
          />
        </Box>
      </Box>
      <Box className={classes.form__multi_row}>
        <Box className={classes.form__number_input}>
          <InputLabel htmlFor="airplane-speed-input">Cruise Speed</InputLabel>
          <Input
            id="airplane-speed-input"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            aria-describedby="airplane-speed-number"
            type="number"
            required
          />
        </Box>
        <Button
          className={classes.form__submit}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AirplaneForm;
