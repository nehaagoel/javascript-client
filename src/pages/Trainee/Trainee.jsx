import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import AddDialog from './components/AddDialog/AddDialog';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
});

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleSubmit = (data) => {
    this.setState({
      open: false,
    }, () => {
      console.log(data);
    });
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        ADD TRAINEE
          </Button>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
        </div>
      </>
    );
  }
}
Trainee.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Trainee);
