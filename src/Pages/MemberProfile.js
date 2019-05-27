import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import Phone from '@material-ui/icons/Phone';

import CustomCard from '../components/card'
import CustomTab from '../components/tabs'

const styles = theme => ({
    root: {
        //display: 'flex',
        flexGrow: 1,
      },
      card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
 menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
 
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class DisabledTabs extends React.Component {
 
    state = {
        value: 2,
        data: [
            {
                firstName: "Karen",
                lastName: "Gocsik",
                mobile_number: "(858)534-6196",
                address: "9500 Gilman Dr Mail Code 0422 La Joila. CA 920993 - 0422",

            }
        ]
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };

    render(){
        const { classes } = this.props;

        return (
          <div className={classes.root}>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                  <Grid container spacing={24}>
                    <Grid item xs>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Button size="small">
                                    <Phone/>
                                </Button>
                                <Button size="small">
                                (858)534-6196
                                </Button>
                                <Button size="small">
                                    <LocationOn/>
                                </Button>
                                <Button size="small" >
                                     9500 Gilman Dr Mail Code 0422 La Joila.\
                                </Button>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            Karen Gocsik
                        </Typography>
                        <Typography>
                            Deaconess
                        </Typography>
                        <CustomTab/>
                    </Grid>
                    <Grid item xs>
                        <CustomCard/>
                    </Grid>
                </Grid>
              </main>
          </div>
        );
    }
}

DisabledTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisabledTabs);
