import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
  },
  slider: {
    padding: '22px 0px',
    position: 'relative',
    width: '70%',
    marginLeft: '15%'
  },
  sliderValue: {
    color: '#ffffff',
    position: 'relative',
    width: '40%',
    marginLeft: '33%',
    // margin: '0 auto',
    textAlign: 'center',
    marginTop: '10px',
    fontWeight: 'bold'
  }
};

class PercentageSlider extends React.Component {
  state = {
    value: 50
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        {/* <Typography classes={{ container: classes.labelText1}}>100 %</Typography> */}
        <Slider
          classes={{ container: classes.slider}}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
        <span className={classes.sliderValue}>{100 + parseInt(this.state.value.toFixed(2))}% of shortest distance</span>
      </div>
    );
  }
}

PercentageSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PercentageSlider);