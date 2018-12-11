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
      height: 150,
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
    titleDistance: {
      fontSize: 16,
      float: "left",
      marginLeft: 20,
      marginTop: 10
    },
    titleElevation: {
      fontSize: 16,
      float: "right",
      marginRight: 20,
      marginTop: 10
    },
    pos: {
      marginBottom: 12,
    },
  };


function RouteStatistic(props) {

    console.log("Props: ", props);

    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout="1000">
            <Card className={classes.card}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className="detailTitle">
                    Route Statistics
                </Typography>
                <Typography className={classes.titleDistance} color="textSecondary" gutterBottom>
                   <strong>Total Distance</strong> <br /> {props["distance"].toFixed(2)} meters
                </Typography>
                <Typography className={classes.titleElevation} color="textSecondary" gutterBottom>
                   <strong>Elevation Gain</strong> <br /> {props["elevation"]} meters
                </Typography>
                </CardContent>
            </Card>
        </Slide>
    );
  }

  RouteStatistic.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(RouteStatistic);
