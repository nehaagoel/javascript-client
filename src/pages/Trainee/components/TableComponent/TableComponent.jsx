/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer, Table, TableHead, TableRow, TableBody, TableCell,
  Paper, withStyles, TableSortLabel,
} from '@material-ui/core';

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
    },
  },
});

function TableComponent(props) {
  const {
    classes, data, column, order, orderBy, onSort, onSelect,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              column.map(({ align, label }) => (
                <TableCell
                  className={classes.header}
                  align={align}
                  sortDirection={orderBy === label ? order : false}
                >
                  <TableSortLabel
                    direction={orderBy === data.id ? order : 'asc'}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.trainees.map((element) => (
            <TableRow
              key={element.id}
              className={classes.root}
              onMouseEnter={onSelect(element)}
            >
              {column.map(({ field, align, format }) => (
                <TableCell align={align}>
                  {format !== undefined
                    ? format(element[field])
                    : element[field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
  onSort: () => {},
};
export default withStyles(useStyles)(TableComponent);
