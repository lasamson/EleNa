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
      marginTop: 50,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };


function RouteStatistic(props) {

    console.log(props);

    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit timeeout="2000">
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Route Statistic
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
