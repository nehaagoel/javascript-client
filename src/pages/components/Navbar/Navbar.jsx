import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const style = () => ({
  title: {
    flexGrow: 1,
  },
});

function NavBar(props) {
  const { classes } = props;
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
      Trainee Portal
          </Typography>
          <Button color="inherit">TRAINEE</Button>
          <Button color="inherit">TEXTFIELD DEMO</Button>
          <Button color="inherit">INPUT DEMO</Button>
          <Button color="inherit">CHILDREN DEMO</Button>
          <Button color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(style)(NavBar);
