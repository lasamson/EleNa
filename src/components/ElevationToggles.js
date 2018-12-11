import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
  toggleContainer: {
    // height: 56,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 0,
    position: 'relative',
    width: '30%',
    marginLeft: '37%',
    marginTop: '3.6%',
    marginBottom: '1%'
  },
});

class ElevationToggles extends React.Component {
  state = {
    alignment: 'left',
    formats: ['bold'],
  };

  handleFormat = (event, formats) => this.setState({ formats });

  handleAlignment = (event, alignment) => this.setState({ alignment });

  render() {
    const { classes } = this.props;
    const { alignment, formats } = this.state;

    return (
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={formats} exclusive onChange={this.handleFormat}>
              <ToggleButton value="bold" data="min-elevation">
                Min
              </ToggleButton>
              <ToggleButton value="italic" data="max-elevation">
                Max
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
    );
  }
}

ElevationToggles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ElevationToggles);
