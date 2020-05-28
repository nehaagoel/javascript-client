import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { AddDialog, TableComponent } from './components/index';
import trainees from './data/trainee';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(4),
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
      orderBy: '',
      order: 'asc',
      data: null,
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

  handleSelect = (element) => (event) => {
    const { data } = this.state;
    this.setState({ data: element });
  };

  handleSort = (field) => (event) => {
    const { order, orderBy } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  render() {
    const { open, order, orderBy } = this.state;
    const {
      match: { url }, classes,
    } = this.props;
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
                },
                {
                  field: 'email',
                  label: 'Email Address',
                  format: (value) => value && value.toUpperCase(),
                },
                {
                  field: 'createdAt',
                  label: 'Date',
                  align: 'right',
                },
              ]
            }
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            onSelect={this.handleSelect}
          />
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
