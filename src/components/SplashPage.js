import React from "react";
import { useAuth0 } from "../flippy-flapp-spa";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Backdrop,
  CircularProgress,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import FlightIcon from "@material-ui/icons/Flight";
import ExploreRoundedIcon from "@material-ui/icons/ExploreRounded";
import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@material-ui/icons/FlightLandRounded";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import AirlineSeatReclineNormalRoundedIcon from "@material-ui/icons/AirlineSeatReclineNormalRounded";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  page_container: {
    width: "100vw",
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#bae1ff",
    overflow: "auto",
  },
  headline: {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    textDecoration: "underline",
    textDecorationColor: theme.palette.secondary.light,
  },
  description: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  page_content: {
    backgroundColor: "#bae1ff",
  },
  timeline: {
    borderRadius: "10px",
    color: "#000",
  },
  timeline_dot: {
    backgroundColor: theme.palette.secondary.dark,
  },
  timeline_tail: {
    backgroundColor: theme.palette.primary.dark,
  },
  paper: {
    padding: "6px 16px",
    // backgroundColor: "#90a4ae",
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
  typography_link: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.dark,
    padding: "5px",
    borderRadius: "2px",
    textDecoration: "none",
    "&&:hover": {
      color: "#000",
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const SplashPage = () => {
  const { loading, loginWithRedirect } = useAuth0();
  const classes = useStyles();

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box className={classes.page_container}>
      <Container className={classes.page_content} maxWidth="lg">
        <Box className={classes.headline}>
          <Typography variant="h1">flippyFlapp</Typography>
        </Box>
        <Box>
          <Paper className={classes.description} elevation={5}>
            <Typography variant="h6" component="h1">
              Welcome to the skies
            </Typography>
            <Typography>
              Here at flippyFlapp, we're passionate about your passion for
              flying. Let us help you organize your hangar, find airports near
              the places you're interested in, get your flight plans in order,
              and schedule your time.
            </Typography>
          </Paper>
        </Box>
        <Timeline align="alternate" className={classes.timeline}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <FlightIcon />
              </TimelineDot>
              <TimelineConnector className={classes.timeline_tail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Create a Plane
                </Typography>
                <Typography>
                  <Link className={classes.typography_link} onClick={() => loginWithRedirect({})}>Sign in</Link>,
                  input your plane's specifications, and get started.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <ExploreRoundedIcon />
              </TimelineDot>
              <TimelineConnector className={classes.timeline_tail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Explore Airports
                </Typography>
                <Typography>
                  Browse the map and select a marker to see an airport's
                  details.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <FlightTakeoffRoundedIcon />
              </TimelineDot>
              <TimelineConnector className={classes.timeline_tail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Add a Start Point
                </Typography>
                <Typography>
                  Select the airport at which you'd like to begin your flight.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <FlightLandRoundedIcon />
              </TimelineDot>
              <TimelineConnector className={classes.timeline_tail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Add an End Point
                </Typography>
                <Typography>
                  Decide where you'd like to go, and pick an airport nearby.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <TimelineRoundedIcon />
              </TimelineDot>
              <TimelineConnector className={classes.timeline_tail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Preview your Route
                </Typography>
                <Typography>
                  We'll find the optimal route of refueling stops along the way,
                  so sit back and imagine the journey.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <SaveRoundedIcon />
              </TimelineDot>
              <TimelineConnector className={classes.timeline_tail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Save it for later
                </Typography>
                <Typography>
                  Schedule your flight on our calendars, and we'll make sure you
                  never double-book yourself.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.timeline_dot}>
                <AirlineSeatReclineNormalRoundedIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6 " component="h1">
                  Take Off!
                </Typography>
                <Typography>
                  Hit the road, Jack. (Figuratively speaking, of course.) Enjoy
                  your flight!
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
    </Box>
  );
};

export default SplashPage;
