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
import ls from 'local-storage';
import callApi from '../../../../libs/utils/api';
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
      loader: false,
      count: 100,
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRemove = (deletedData, onClose) => {
    onClose();
    console.log('Deleted Item');
    console.log(deletedData);
    const { count, rowsPerPage, page } = this.state;
    const mod = count % rowsPerPage;
    if (mod === 1) {
      this.setState({
        page: page - 1,
      });
    }
  };

  onClickHandler = async (value) => {
    const token = ls.get('token');
    const { deletedData, onClose } = this.props;
    const { originalId: id } = deletedData;
    await this.setState({
      loader: true,
    });
    const response = await callApi(
      'delete',
      `/trainee/${id}`,
      {
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 'ok') {
      this.handleRemove(deletedData, onClose);
      value(response.message, 'success');
    } else {
      value(response.message, 'error');
    }
    this.setState({
      loader: false,
    });
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
                <Button onClick={() => this.onClickHandler(value)} color="primary" autoFocus className={classes.button_color}>
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
