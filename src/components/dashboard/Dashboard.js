import React from "react";
import { useAuth0 } from "../../flippy-flapp-spa";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  List,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import GoogleMaps from "./customMap.js";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
  },
  left_container: {
    width: "20vw",
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
  fab_container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  fab: {
    backgroundColor: theme.palette.success.main,
    "&&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
              <Typography>Flight Plans</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <>
                <Typography>Put the list of flight plans here</Typography>
              </>
              <div className={classes.fab_container}>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  className={classes.fab}
                >
                  <AddIcon />
                </Fab>
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
              <Typography>Planes</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <>
                <Typography>Put list of planes here</Typography>
              </>
              <div className={classes.fab_container}>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  className={classes.fab}
                >
                  <AddIcon />
                </Fab>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Box>
      </Box>
      <Box className={classes.right_container} anchor="right">
        <GoogleMaps />
      </Box>
    </Box>
  );
};

export default Dashboard;
