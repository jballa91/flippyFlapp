import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "../../flippy-flapp-spa";
import { makeStyles } from "@material-ui/core/styles";

import { RadioGroup, Radio, Typography, Divider } from "@material-ui/core";

import { actions } from "../../store/airplanes";
import { thunks } from "../../store/airplanes";

const useStyles = makeStyles((theme) => ({
  radio: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: theme.spacing(2),
  },
}));

const AirplaneList = () => {
  const classes = useStyles();
  const { user, getTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const airplaneList = useSelector(
    (state) => state.airplanes.airplaneList || []
  );
  const [checkedPlane, setCheckedPlane] = React.useState(airplaneList[0]?.id);

  // array.find((airplane) => return airplane.id === e.target.value) ### if the value is an id
  const handleCheckAirplane = (e) => {
    console.log(e.target.value);

    setCheckedPlane(e.target.value);
    const theAirplane = airplaneList.find((airplane) => {
      console.log(airplane.id);
      return airplane.id === parseInt(e.target.value);
    });
    console.log(theAirplane);

    dispatch(actions.setSelectedAirplane(theAirplane));
  };

  useEffect(() => {
    (async () => {
      const token = await getTokenSilently();
      dispatch(thunks.updateAirplaneList(user, token));
    })();
  }, []);

  return (
    <RadioGroup
      aria-label="plane"
      value={checkedPlane}
      onChange={handleCheckAirplane}
    >
      {airplaneList.map((airplane, i) => {
        return (
          <div className={classes.radio}>
            <Typography>{airplane.name}</Typography>
            <Radio
              checked={checkedPlane == airplane.id}
              label={airplane.name}
              value={airplane.id}
              inputProps={{ "aria-label": "select plane" }}
              divider
            />
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default AirplaneList;
