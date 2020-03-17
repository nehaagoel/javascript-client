/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';
import { Avatar, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const Design = (theme) => ({
  icon: {
    background: 'red',
    marginLeft: theme.spacing(22),
    marginTop: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
  },
  main: {
    width: 400,
    marginTop: theme.spacing(25),
    marginLeft: theme.spacing(75),
  },
});

class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string()
      .trim().email().required('Email Address is a required field'),
    password: yup.string()
      .required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      touched: {
        email: false,
        password: false,
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
      const { classes } = this.props;
      return (
        <>
          <div className={classes.main}>
            <CssBaseline />
            <Card open aria-labelledby="form-dialog-title">
              <Avatar className={classes.icon}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h3" className={classes.title}>Login</Typography>
              <CardContent>
                <form>
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
                  <div>
                    <TextField
                      type="password"
                      helperText={this.getError('password')}
                      error={!!this.getError('password')}
                      required
                      id="outlined-required"
                      label="Password"
                      variant="outlined"
                      fullWidth
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
                  <div>
                    <Button variant="contained" color="primary" disabled={this.hasErrors()} fullWidth>SIGN IN</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      );
    }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(Design)(Login);
