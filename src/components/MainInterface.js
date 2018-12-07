import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PercentageSlider from './PercentageSlider';
import ElevationToggles from './ElevationToggles';
import '../styles/MainInterface.css';
import MapView from './MapView';

const drawerWidth = 425;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    padding: 0
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class MainInterface extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          <h1 className="elenaLogo">EleNa</h1>
          <Input
            placeholder="Source"
            id="source"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Input
            placeholder="Destination"
            id="destination"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <ElevationToggles></ElevationToggles>
          <PercentageSlider></PercentageSlider>
          <Button variant="contained" className={classes.button} onClick={() => { this.sendRequest() }}>
            Go!
          </Button>
        </Drawer>
        <main className={classes.content}>
        <MapView></MapView>
        </main>
      </div>
    ); }

    sendRequest() {

        const source = document.getElementById('source').value;
        const destination = document.getElementById('destination').value;
        const percentage = Number(document.getElementsByClassName("MuiSlider-root-122")[0].getAttribute("aria-valuenow")) + 100;

        fetch("http://localhost:8080/get_route", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
          body: JSON.stringify({
            Source: source,
            Destination: destination,
            Max_min: 'test3',
            Percentage: percentage
          })
        })
        .then(res => res.json())
        .then(json => console.log(JSON.stringify(json)));
    }
  }

MainInterface.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainInterface);
