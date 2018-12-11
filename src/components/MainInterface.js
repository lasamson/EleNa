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
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';

const mytheme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#4285F4',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  spacing: {
    unit: '15%'
  }
});

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
    width: '35vw',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: 0,
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    backgroundColor: mytheme.palette.primary.main,
    overflowX: 'hidden'
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
    position: 'relative',
    padding: [0],
    width: '20%',
    display: 'flex',
    marginLeft: '40%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    fontWeight: 'bold',
    marginTop: '7%'
    // background: '#3267D6'
  },
  goText: {
    color: '#ffffff'
  },
  inputStyle: {
    // borderBottom: '2px solid white',
    color: '#ffffff'
  },
  textField: {
    position: 'relative',
    marginLeft: mytheme.spacing.unit,
    marginRight: mytheme.spacing.unit,
    width: '70%',
    textAlign: 'center'
  },

  cssLabel: {
    color : 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
    }
  },

  cssFocused: {color: 'white'},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
});

const muiTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          backgroundColor: '#ffffff',
        }
      },
    },
  }
});

class MainInterface extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderRoute: false
    }
  }

  render() {
    const { classes } = this.props;
    let map;
    if(this.state.renderRoute) {
      map = <MapView route={this.state.route}></MapView>
    } else {
      map = <MapView></MapView>
    }

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

          {/* <Input
            placeholder="Source"
            id="source"
            // className={classes.input}
            classes = {{
              input: classes.inputStyle
            }}
            disableUnderline={true}
            inputProps={{
              'aria-label': 'Description',
            }}
          /> */}
          {/* <MuiThemeProvider muiTheme={muiTheme}> */}
          {/* <Input
            placeholder="Destination"
            id="destination"
            // className={classes.input}
            classes = {{
              input: classes.inputStyle
            }}
            disableUnderline={true}
            inputProps={{
              'aria-label': 'Description',
            }}
          /> */}
          <TextField
          id="source"
          label="Source"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        <TextField
          id="destination"
          label="Destination"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
          {/* </MuiThemeProvider> */}
          <ElevationToggles></ElevationToggles>
          <PercentageSlider></PercentageSlider>
          <Button variant="contained" className={classes.button} onClick={() => { this.sendRequest() }}>
          <span className={classes.goText}>Go!</span>
          </Button>
        </Drawer>
        <main className={classes.content}>
            {map}
        </main>
      </div>
    ); }

    sendRequest() {

        const source = document.getElementById('source').value;
        const destination = document.getElementById('destination').value;
        const percentage = Number(document.getElementsByClassName("MuiSlider-root-121")[0].getAttribute("aria-valuenow")) + 100;
        const max_min = document.getElementsByClassName("MuiToggleButton-selected-111")[0].firstElementChild.textContent.toLowerCase();

        fetch("http://localhost:8080/get_route", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
          body: JSON.stringify({
            Source: source,
            Destination: destination,
            Max_min: max_min,
            Percentage: percentage
          })
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
              route: json["Route"],
              renderRoute: true
            });
        });
    }
  }

MainInterface.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainInterface);
