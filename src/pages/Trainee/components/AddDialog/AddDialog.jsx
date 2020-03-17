/* eslint-disable consistent-return */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import * as yup from 'yup';
import { withStyles } from '@material-ui/core/styles';

const passwordStyle = () => ({
  passfield: {
    display: 'flex',
    flexdirection: 'row',
  },
  pass: {
    flex: 1,
  },
});

class AddDialog extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(3),
    email: yup.string()
      .trim().email().required('Email is a required field'),
    password: yup.string()
      .required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Must match password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        this.schema.validateSync(this.state);
      } catch (err) {
        return true;
      }
      return false;
    }

    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          this.schema.validateSyncAt(field, this.state);
          return false;
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

    render() {
      const {
        open, onClose, onSubmit, classes,
      } = this.props;
      // console.log(this.state);
      const { name, email, password } = this.state;
      return (
        <>
          <form>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>
            Enter your trainee details
                </DialogContentText>
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue=" "
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange('name')}
                    onBlur={() => this.isTouched('name')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    helperText={this.getError('name')}
                    error={!!this.getError('name')}
                  />
                </div>
          &nbsp;
                <div>
                  <TextField
                    helperText={this.getError('email')}
                    error={!!this.getError('email')}
                    required
                    id="outlined-required"
                    label="Email Address"
                    defaultValue=" "
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange('email')}
                    onBlur={() => this.isTouched('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
          &nbsp;
                <div className={classes.passfield}>
                  <div className={classes.pass}>
                    <TextField
                      type="password"
                      helperText={this.getError('password')}
                      error={!!this.getError('password')}
                      required
                      id="outlined-required"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange('password')}
                      onBlur={() => this.isTouched('password')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityOffIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
            &nbsp;
            &nbsp;
                  <div className={classes.pass}>
                    <TextField
                      type="password"
                      helperText={this.getError('confirmPassword')}
                      error={!!this.getError('confirmPassword')}
                      required
                      id="outlined-required"
                      label="Confirm Password"
                      variant="outlined"
                      onChange={this.handleChange('confirmPassword')}
                      onBlur={() => this.isTouched('confirmPassword')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityOffIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
          &nbsp;
                <div align="right">
                  <Button onClick={onClose} color="primary">CANCEL</Button>
                  <Button variant="contained" color="primary" disabled={this.hasErrors()} onClick={() => onSubmit()({ name, email, password })}>SUBMIT</Button>
                </div>
              </DialogContent>
            </Dialog>
          </form>
        </>
      );
    }
}
export default withStyles(passwordStyle)(AddDialog);
