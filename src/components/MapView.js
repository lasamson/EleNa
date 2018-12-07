import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// these are the styles for the MapView
const styles = theme => ({
});

class MapView extends Component {
    render() {
        // the server needs to send data to this component
        // render the map that shows the best route based on elevation
    }
}

MapView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapView);