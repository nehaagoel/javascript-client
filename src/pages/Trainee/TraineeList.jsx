import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, withStyles,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import {
  AddDialog, TableComponent, EditDialog, DeleteDialog,
} from './components/index';
import { trainees, getDateFormatted } from './data/trainee';
import columns from './data/traineeHelper';

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
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (data, value) => {
    this.setState({
      open: false,
    }, () => {
      console.log(data);
    });
    const message = 'This is Success Message';
    const status = 'success';
    value(message, status);
  };

  handleSelect = (element) => (event) => {
    this.setState({
      data: element,
    });
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });
  };

  handleDeleteDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (name, email, value) => {
    this.setState({
      EditOpen: false,
    });
    console.log({ name, email });
    const message = 'This is a success message';
    const status = 'success';
    value(message, status);
  };

  render() {
    const {
      open, order, orderBy, editData, page, rowsPerPage, EditOpen, RemoveOpen, deleteData,
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.dialog}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEELIST
            </Button>
            <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
          </div>
          <EditDialog
            Editopen={EditOpen}
            handleEditClose={this.handleEditClose}
            handleEdit={this.handleEdit}
            data={editData}
          />
          <br />
          <DeleteDialog
            openRemove={RemoveOpen}
            onClose={this.handleRemoveClose}
            deletedData={deleteData}
          />
          <br />
          <br />
          <TableComponent
            id="table"
            data={trainees}
            column={columns}
            actions={[
              {
                Icon: <Edit />,
                handler: this.handleEditDialogOpen,
              },
              {
                Icon: <Delete />,
                handler: this.handleDeleteDialogOpen,
              },
            ]}
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            onSelect={this.handleSelect}
            count={100}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(TraineeList);
