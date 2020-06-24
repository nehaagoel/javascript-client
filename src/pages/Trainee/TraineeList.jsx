import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, withStyles,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import ls from 'local-storage';
import {
  AddDialog, WrapTable, EditDialog, DeleteDialog,
} from './components/index';
import callApi from '../../libs/utils/api';
import columns from './data/traineeHelper';
import { snackbarContext } from '../../contexts/index';

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
      loader: true,
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      addData: [],
      traineedata: {},
      deleteData: {},
      count: 100,
      page: 0,
      rowsPerPage: 10,
    };
  }

  async componentDidMount() {
    this.handleFetch();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (data, value) => {
    const { addData } = this.state;
    this.handleFetch();
    this.setState({
      open: false,
    }, () => {
      addData.push({ name: data.Name, email: data.Email, password: data.Password });
    });
    const message = 'This is Success Message';
    const status = 'success';
    value(message, status);
  };

  handleSelect = (element) => (event) => {
    this.setState({
      traineedata: element,
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

  async handleFetch() {
    const token = ls.get('token');
    const response = await callApi(
      'get',
      '/trainee',
      {
        params: {
          skip: 0,
          limit: 100,
        },
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 'ok') {
      this.setState({
        count: response.data.records.length,
        addData: response.data.records,
        loader: false,
      });
    } else {
      const value = this.context;
      value(response.message, 'error');
      this.setState({
        loader: false,
      });
    }
  }

  render() {
    const {
      open, order, orderBy, editData, page, rowsPerPage, EditOpen, RemoveOpen, deleteData, loader, addData, count,
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
            EditClose={this.handleEditClose}
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
          <WrapTable
            id="table"
            loader={loader}
            datalength={addData.length}
            data={addData}
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
            count={count}
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
TraineeList.contextType = snackbarContext;
