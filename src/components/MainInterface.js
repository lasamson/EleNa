import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import PercentageSlider from './PercentageSlider';
import '../styles/MainInterface.css';

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
  },
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
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Input
            placeholder="Destination"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <ToggleButtonGroup>
            <ToggleButton value="min">
              Min
            </ToggleButton>
            <ToggleButton value="rigmaxht">
              Max
            </ToggleButton>
          </ToggleButtonGroup>
          <PercentageSlider></PercentageSlider>
          <Button variant="contained" className={classes.button}>
            Go!
          </Button>
        </Drawer>
        <main className={classes.content}>
        </main>
      </div>
    ); } }

MainInterface.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainInterface);
