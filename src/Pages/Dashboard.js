import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import AppBarComponent from '../components/AppBar'
import DrawerComponent from '../components/Drawer'
import Paper from '../components/paper'
import SimpleLineChart from '../components/SimpleLineChart'
import SimpleTable from '../components/SimpleTable'

const styles = theme => ({
  root: {
    display: 'flex',
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
   // flexGrow: 1,
    padding: theme.spacing.unit * 3,
    //height: '100vh',
    //overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class DashBoard extends React.Component {
 
  render() {
    const { classes, theme } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable />
          </div>
      </main>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DashBoard);
