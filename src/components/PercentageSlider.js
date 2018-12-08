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
  inlineBlock: {
    width: '70%',
    marginLeft: '15%',
    display: 'inline-block'
  },
  labelText1: {
    alignSelf: 'flex-start',
  },
  labelText2: {
    justifyContent: 'flex-end',
  }
};

class PercentageSlider extends React.Component {
  state = {
    value: 50,
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
        {/* <Typography classes={{ container: classes.labelText2}}>200 %</Typography> */}
      </div>
    );
  }
}

PercentageSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PercentageSlider);