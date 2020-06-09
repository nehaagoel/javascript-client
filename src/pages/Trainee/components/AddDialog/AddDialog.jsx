import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { snackbarContext } from '../../../../contexts/SnackBarProvider';
import schema from './DialogSchema';
import Handler from './Handler';
import callApi from '../../../../libs/utils/api';

const passwordStyle = () => ({
  passfield: {
    display: 'flex',
    flexdirection: 'row',
  },
  pass: {
    flex: 1,
  },
});

const constant = {
  Name: Person,
  Email: Email,
  Password: VisibilityOff,
  'Confirm Password': VisibilityOff,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      loader: false,
      disabled: true,
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
        return '';
      } catch (err) {
        return err.message;
      }
    }
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  passwordType = (key) => {
    if (key === 'Password' || key === 'Confirm Password') {
      return 'password';
    }
    return '';
  }

  submitHandler = async (value) => {
    const { name, email, password } = this.state;
    const token = localStorage.getItem('token');
    const { onSubmit } = this.props;
    await this.setState({
      loader: true,
      disabled: true,
    });
    const response = await callApi(
      'post',
      '/trainee',
      { data: { name, email, password } },
      {
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 'ok') {
      onSubmit({ name, email, password });
      value(response.message, 'success');
    } else {
      value(response.message, 'error');
    }
    this.setState({
      loader: false,
      disabled: false,
    });
  };

  render() {
    const {
      open, onClose, classes,
    } = this.props;
    const { loader } = this.state;
    const ans = [];
    Object.keys(constant).forEach((key) => {
      ans.push(<Handler
        label={key}
        onChange={this.handleChange(key)}
        onBlur={() => this.isTouched(key)}
        helperText={this.getError(key)}
        error={!!this.getError(key)}
        icons={constant[key]}
        type={this.passwordType(key)}
      />);
    });

    return (
      <>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <div>{ans[0]}</div>
            <br />
            <div>{ans[1]}</div>
            <br />
            <div className={classes.passfield}>
              <div className={classes.pass}>{ans[2]}</div>
              <br />
              <br />
              <div className={classes.pass}>{ans[3]}</div>
            </div>
            <br />
            <div align="right">
              <Button onClick={onClose} color="primary">CANCEL</Button>
              <snackbarContext.Consumer>
                {(value) => (
                  <Button variant="contained" color="primary" disabled={this.hasErrors()} onClick={() => this.submitHandler(value)}>
                    <span>
                      {loader ? <CircularProgress size={20} /> : ''}
                    </span>
                    SUBMIT
                  </Button>

                )}
              </snackbarContext.Consumer>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withStyles(passwordStyle)(AddDialog);

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
