import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, AppBar, Toolbar, Typography, withStyles, CssBaseline,
} from '@material-ui/core';

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
          <Button color="inherit" href="/">TRAINEE</Button>
          <Button color="inherit" href="/textfield-demo">TEXTFIELD DEMO</Button>
          <Button color="inherit" href="/input-demo">INPUT DEMO</Button>
          <Button color="inherit" href="/children-demo">CHILDREN DEMO</Button>
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
