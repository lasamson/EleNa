import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
    //   minWidth: 300,
    //   height: 250,
      width: 500,
      margin: '0 auto',
      marginTop: 20,
      borderRadius: 10
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    detailTitle: {
        fontWeight: 700
    },
    title: {
      fontSize: 14,
      textAlign: "left"
    },
    pos: {
      marginBottom: 12,
    },
  };


function RouteDirections(props) {

    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout="1000">
            <Card className={classes.card}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className="detailTitle">
                Route Directions
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                1. Head northwest on MA-9 W toward Colonial Village
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                2. Slight left onto MA-9 W/College St
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                3. Turn right onto Amherst Crossing
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                4. Turn left onto Main St
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                5. Turn right onto Boltwood Walk
                </Typography>
                </CardContent>
            </Card>
        </Slide>
    );
  }

  RouteDirections.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(RouteDirections);
