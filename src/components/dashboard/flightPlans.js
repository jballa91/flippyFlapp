import React, { useEffect } from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "../../flippy-flapp-spa";
import { thunks } from "../../store/flightPlans";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function FlightPlans() {
  const classes = useStyles();
  const { user, getTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const flightPlans = useSelector(
    (state) => state.flightPlans.flightPlans || []
  );
  const coordsUrlArr = useSelector(
    (state) => state.flightPlans.flightPathArr || []
  );
  const key = "AIzaSyDscju6O6knNTt9zh71EQkt7Lk1XeejhyQ";

  async function getToken() {
    const token = await getTokenSilently();
    dispatch(thunks.updateFLightPlans(user, token));
  }

  useEffect(() => {
    if (!flightPlans.length) {
      getToken();
    } else {
    }
  });

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {flightPlans.map((flightPlan, i) => {
          return (
            <GridListTile key={flightPlan.id}>
              <img
                src={`http://maps.google.com/maps/api/staticmap?size=220x180&path=color:0xff0000ff|weight:5${coordsUrlArr[i]}&markers=color%3ablue|label%3aS${coordsUrlArr[i]}&sensor=false&key=${key}`}
                alt={"Google Map"}
              />
              <GridListTileBar
                title={flightPlan.name}
                subtitle={<span>by: {flightPlan.user_id}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${flightPlan.name}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

export default FlightPlans;
