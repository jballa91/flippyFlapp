import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "../../flippy-flapp-spa";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Divider,
  Menu,
  MenuList,
  MenuItem,
  Backdrop,
} from "@material-ui/core";
import FlightIcon from "@material-ui/icons/Flight";
import RoomIcon from "@material-ui/icons/Room";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import GoogleMaps from "./customMap.js";
import SubmitPath from "./submitPath";
import AirplaneForm from "./AirplaneForm";
import AirplaneList from "./AirplaneList";

import actions from "../../store/airplanes";
import { thunks } from "../../store/airplanes";

import { api } from "../../config";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    overflow: "none",
  },
  left_container: {
    width: "20vw",
    overflow: "auto",
  },
  dash_menu: {
    height: "calc(100vh - 64px)",
    width: "20vw",
    flexShrink: 0,
  },
  right_container: {
    width: "80vw",
    height: "calc(100vh - 64px)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  fab_container: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  fab: {
    backgroundColor: theme.palette.success.main,
    "&&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 20,
    color: "#fff",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [backdrop, setBackdrop] = React.useState(false);

  const { user, getTokenSilently } = useAuth0();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBackdropClose = () => {
    setBackdrop(false);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleAdd1 = (event) => {
    debugger;
    setAnchorEl1(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleBackdropToggle = () => {
    setBackdrop(!backdrop);
    handleClose2();
  };

  const handleAdd2 = (e) => {
    setAnchorEl2(e.currentTarget);
  };

  const handleAddDefaultPlane = async () => {
    const token = await getTokenSilently();

    const res = await fetch(`${api}/airplanes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "Cessna 172 Skyhawk",
        fuel_load: 40,
        fuel_consumption: 8,
        speed: 115,
        start_taxi_takeoff_fuel_use: 1.1,
        user_id: user.id,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      console.log(result);
      props.updateAirplaneList(user, token);
      handleClose2();
    }
  };

  return (
    <Box className={classes.page}>
      <Box className={classes.left_container}>
        <Box className={classes.dash_menu} variant="permanent" anchor="left">
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <RoomIcon className={classes.menuIcon} />
              <Typography>Flight Plans</Typography>
            </ExpansionPanelSummary>
            <Divider dark />
            <ExpansionPanelDetails className={classes.details}>
              <>
                <Typography>Put the list of flight plans here</Typography>
              </>
              <div className={classes.fab_container}>
                <Fab
                  color="primary"
                  aria-label="add-route"
                  aria-controls="add-route"
                  aria-haspopup="true"
                  onClick={handleAdd1}
                  size="small"
                  className={classes.fab}
                >
                  <AddIcon />
                </Fab>
                <Menu
                  id="add-route"
                  anchorEl={anchorEl1}
                  open={Boolean(anchorEl1)}
                  onClose={handleClose1}
                >
                  <MenuItem>Add A New Route</MenuItem>
                  <MenuItem onClick={handleClose1}>Add Default Route</MenuItem>
                </Menu>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel2bh-header"
            >
              <FlightIcon className={classes.menuIcon} />
              <Typography>Hangar</Typography>
            </ExpansionPanelSummary>
            <Divider dark />
            <ExpansionPanelDetails className={classes.details}>
              <AirplaneList />
              <div className={classes.fab_container}>
                <Fab
                  color="primary"
                  aria-label="add-plane"
                  aria-controls="add-plane"
                  aria-haspopup="true"
                  onClick={handleAdd2}
                  size="small"
                  className={classes.fab}
                >
                  <AddIcon />
                </Fab>
                <Menu
                  id="add-plane"
                  anchorEl={anchorEl2}
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                >
                  <MenuItem onClick={handleBackdropToggle}>
                    Add A New Plane
                  </MenuItem>
                  <MenuItem onClick={handleAddDefaultPlane}>
                    Add Default Plane
                  </MenuItem>
                </Menu>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <SubmitPath />
        </Box>
      </Box>
      <Box className={classes.right_container} anchor="right">
        <GoogleMaps />
      </Box>
      <Backdrop
        className={classes.backdrop}
        open={backdrop}
        onClick={handleBackdropClose}
      >
        <AirplaneForm backdropClose={handleBackdropClose} />
      </Backdrop>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAirplaneList: (user, token) =>
      dispatch(thunks.updateAirplaneList(user, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
