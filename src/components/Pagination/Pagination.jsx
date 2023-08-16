import React from 'react';
import { TablePagination } from '@mui/material';

export const  Pagination = ({ count, rowsPerPage, page, onChangePage, onChangeRowsPerPage }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
    />
  );
};

