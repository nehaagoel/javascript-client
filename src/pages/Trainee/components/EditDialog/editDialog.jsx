import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  withStyles, Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  InputAdornment,
} from '@material-ui/core';
import ls from 'local-storage';
import { Email, Person } from '@material-ui/icons';
import callApi from '../../../../libs/utils/api';
import { snackbarContext } from '../../../../contexts/index';

const useStyles = () => ({
  button_color: {
    backgroundColor: 'blue',
    color: 'black',
  },
  button_error: {
    backgroundColor: '#bbb9b9',
  },
});

class EditDialog extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3),
    email: yup.string().email().required('Email is required'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loader: false,
      error: {
        name: '',
        email: '',
      },
    };
  }

  handleSet = () => {
    const { data } = this.props;
    this.setState({
      name: data.name,
      email: data.email,
    });
  };

  handleOnChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  getError = (field) => {
    const { error } = this.state;
    this.schema
      .validateAt(field, this.state)
      .then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      })
      .catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    return error[field];
  };

  hasErrors = () => {
    const { error } = this.state;
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== '');
    return !!iserror.length;
  };

  handleEdit = (name, email, EditClose) => {
    EditClose();
    console.log({ name, email });
  };

  onClickHandler = async (value) => {
    const { name, email } = this.state;
    const token = ls.get('token');
    const { EditClose, data } = this.props;
    const { originalId: id } = data;
    const response = await callApi(
      'put',
      '/trainee',
      {
        data: { name, email, id },
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 'ok') {
      this.handleEdit(name, email, EditClose);
      value(response.message, 'success');
    } else {
      value(response.message, 'error');
    }
    this.setState({
      loader: false,
    });
  }

  render() {
    const {
      Editopen, handleEdit, data, classes, EditClose,
    } = this.props;
    const { name, email, error } = this.state;
    return (
      <div>
        <Dialog
          open={Editopen}
          onClose={EditClose}
          onMouseEnter={this.handleSet}
          variant="outlined"
          color="primary"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit your trainee details</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  error={!!error.name}
                  id="outlined-required"
                  type="text"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={data.name}
                  helperText={this.getError('name')}
                  onChange={this.handleOnChange('name')}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12}>
                <TextField
                  error={!!error.email}
                  id="outlined-required"
                  type="text"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={data.email}
                  helperText={this.getError('email')}
                  onChange={this.handleOnChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={EditClose} color="primary">
              Cancel
            </Button>
            <snackbarContext.Consumer>
              {(value) => (
                <Button
                  onClick={() => this.onClickHandler(value)}
                  className={
                    (name === data.name && email === data.email) || this.hasErrors()
                      ? classes.button_error
                      : classes.button_color
                  }
                  color="primary"
                  disabled={
                    !!((name === data.name && email === data.email) || this.hasErrors())
                  }
                >
                  Submit
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
EditDialog.propTypes = {
  Editopen: PropTypes.bool.isRequired,
  EditClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);
