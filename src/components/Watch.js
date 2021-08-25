//import react and hook functions; allows use of state without defining a class
import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import localStorage hook from ./hooks
import useLocalStorage from "../hooks/useLocalStorage";
//import components from material-ui library
import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: 12,
  },
}));

const Watch = () => {
  const classes = useStyles();
  //State variable contianing: Time and
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [laps, setLap] = useLocalStorage("laps", []);

  const counterRef = useRef(0);
  const handleStart = () => {
    setIsRunning(true);
    counterRef.current = setInterval(() => {
      console.log("cts");
      setTime((time) => time + 1.6);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(counterRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(counterRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const handleLap = () => {
    setLap((laps) => [...laps, parseTime(time)]);
  };

  const handleClearLaps = () => {
    localStorage.clear();
    setLap([]);
    alert("CLEAR!");
  };

  const parseTime = (time) => {
    var centiSec_num = parseInt(time, 10); // don't forget the second param
    var hours = Math.floor(centiSec_num / 360000);
    var minutes = Math.floor((centiSec_num - hours * 360000) / 6000);
    var seconds = Math.floor((centiSec_num - minutes * 6000) / 100);
    var centiseconds = centiSec_num - seconds * 100;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (centiseconds < 10) {
      centiseconds = "0" + centiseconds;
    }
    if (centiseconds < 100) {
      centiseconds = "0" + centiseconds;
    }
    return hours + ":" + minutes + ":" + seconds + ":" + centiseconds;
  };

  const renderList = (listOfLaps) => {
    const listItems = (
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {listOfLaps.map((lap) => (
          <Grid key={lap} item>
            <Paper className={classes.paper}> {lap} </Paper>
          </Grid>
        ))}
      </Grid>
    );

    return listItems;
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      <Grid item lg={12} sm={6} xs={3}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item lg={12} sm={6} xs={3} display="block">
            {" "}
            <Typography variant="h1" component="h2" gutterBottom>
              {/* brackets around the variable names tells the app that these are variables; 
            without them, the app would render the text to the screen instead */}
              {parseTime(time)}
            </Typography>
          </Grid>
          <Grid item lg={12} sm={6} xs={3}>
            <ButtonGroup
              color="primary"
              aria-label="outlined secondary button group"
              size="large"
            >
              {!isRunning && time === 0 && (
                <Button onClick={handleStart}> Start </Button>
              )}
              {isRunning && <Button onClick={handleStop}> Stop </Button>}
              {!isRunning && time !== 0 && (
                <Button onClick={handleStart}> Resume </Button>
              )}
              <Button onClick={handleReset}>Reset</Button>
              <Button onClick={handleLap}>Lap</Button>
              <Button onClick={handleClearLaps}>Clear Laps</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} sm={6} xs={3}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            {" "}
            <Typography variant="h1" component="h2" gutterBottom>
              Laps
            </Typography>
          </Grid>
          <Grid item lg={12} sm={6} xs={3}>
            {" "}
            {renderList(laps)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Watch;
