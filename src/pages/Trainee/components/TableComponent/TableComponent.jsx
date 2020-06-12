import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer, Table, TableHead, TableRow, TableBody, TableCell,
  Paper, withStyles, TableSortLabel, TablePagination, IconButton,
} from '@material-ui/core';
import { withLoaderandMessage } from '../../../../components/index';

const useStyles = (theme) => ({
  table: {
    minWidth: 700,
  },
  header: {
    color: 'grey',
  },
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'rgb(200,200,200)',
      cursor: 'pointer',
    },
  },
});

function TableComponent(props) {
  const {
    classes, data, column, order, orderBy, onSort, onSelect, actions, count, page,
    rowsPerPage, onChangePage, onChangeRowsPerPage,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {column.map((Data) => (
              <TableCell
                className={classes.header}
                align={Data.align}
                sortDirection={orderBy === Data.label ? order : false}
              >
                <TableSortLabel
                  active={orderBy === Data.label}
                  direction={orderBy === Data.label ? order : 'asc'}
                  onClick={onSort(Data.label)}
                >
                  {Data.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((element) => (
              <TableRow key={element.id} className={classes.root}>
                {column.map(({ field, align, format }) => (
                  <TableCell align={align} onClick={onSelect(element)}>
                    {format !== undefined
                      ? format(element[field])
                      : element[field]}
                  </TableCell>
                ))}
                <TableCell>
                  {actions.map(({ Icon, handler }) => (
                    <IconButton onClick={handler(element)} className={classes.action}>
                      {Icon}
                    </IconButton>
                  ))}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        className={classes.pages}
        rowsPerPageOptions={[5, 10, 20, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
}

TableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSort: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
  onSort: () => {},
};
const WrapTable = withLoaderandMessage(TableComponent);
export default withStyles(useStyles)(WrapTable);
