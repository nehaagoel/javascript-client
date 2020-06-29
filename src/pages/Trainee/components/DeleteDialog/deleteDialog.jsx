import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import * as moment from 'moment';
import { snackbarContext } from '../../../../contexts/index';

const useStyles = () => ({
  button_color: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleRemove = (value, deletedData, onClose) => {
    onClose();
    console.log('Deleted Item');
    console.log(deletedData);
    const { createdAt } = deletedData;
    const isAfter = moment(createdAt).isSameOrAfter('2019-02-14T18:15:11.778Z');
    const message = isAfter
      ? 'This is a success message!'
      : 'This is an error message!';
    const status = isAfter ? 'success' : 'error';
    value(message, status);
  };

  render() {
    const {
      openRemove, onClose, deletedData, classes,
    } = this.props;
    return (
      <div>
        <Dialog
          open={openRemove}
          variant="outlined"
          color="primary"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove Trainee ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <snackbarContext.Consumer>
              {(value) => (
                <Button onClick={() => this.handleRemove(value, deletedData, onClose)} color="primary" autoFocus className={classes.button_color}>
                  Delete
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(DeleteDialog);
