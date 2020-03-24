import React from 'react';
import PropTypes from 'prop-types';
import {
  Link, BrowserRouter as Router,
} from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
import { AddDialog, TableComponent } from './components/index';
import trainees from './data/trainee';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});


class TraineeList extends React.Component {
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
    const { match: { url }, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.dialog}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        ADD TRAINEELIST
            </Button>
            <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
          </div>
        &nbsp;
        &nbsp;
          <TableComponent
            data={trainees}
            column={
              [
                {
                  field: 'name',
                  label: 'Name',
                  align: 'center',
                },
                {
                  field: 'email',
                  label: 'Email Address',
                },
              ]
            }
          />
          <ul>
            {trainees.map(({ name, id }) => (
              <li key={id}>
                <Link to={`${url}/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(TraineeList);
