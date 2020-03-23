import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, withStyles,
} from '@material-ui/core';

const useStyles = () => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },
});

function TableComponent(props) {
  const { classes, data, column } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              column.map(({ align, label }) => (
                <TableCell className={classes.header} align={align}>{label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, email, id }) => (
            <TableRow key={id}>
              <TableCell align={column[0].align}>
                {name}
              </TableCell>
              <TableCell>{email}</TableCell>
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
};

export default withStyles(useStyles)(TableComponent);
