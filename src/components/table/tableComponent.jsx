// components/TableComponent.js
import React, { useState, useMemo } from "react";
import { formatDateForDisplay } from "../../utils/formatDate";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Label } from "@mui/icons-material";
const TableComponent = ({ data, columns, onEdit, onDelete, presentName }) => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && sortDirection === "asc";
    setSortDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    console.log(`newPage: ${newPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, orderBy, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
    console.log(
      `sortedData.slice(startIndex, endIndex);`,
      sortedData.slice(startIndex, endIndex)
    );
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, rowsPerPage]);

  return (
    <Paper className="overflow-x-auto">
      <TableContainer className="max-h-screen overflow-auto">
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => (
                <TableCell key={id}>
                  <TableSortLabel
                    active={orderBy === id}
                    direction={orderBy === id ? sortDirection : "asc"}
                    onClick={() => handleRequestSort(id)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Thực hiện</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                {columns.map(({ id }) => (
                  <TableCell
                  style={{
                    color: id === "paymentStatus"
                      ? row.paymentStatus === true
                        ? "green"
                        : "red"
                      : "inherit"
                  }}
                    key={id}
                  >
                    {id === "invoiceDate" ||
                    id === "paymentDueDate" ||
                    (id === "paymentDate" && row.paymentDate != null)
                      ? formatDateForDisplay(row[id])
                      : id === "paymentStatus"
                      ? row.paymentStatus === true
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"
                      : row[id]}
                  </TableCell>
                ))}

                {presentName === "bill" ?
                row.oldIndex != null ? (
                  row.invoiced === false ? (
                    <TableCell>
                      <IconButton onClick={() => onEdit(row)}>
                        <ExitToAppIcon />
                        <Typography>Xuất hóa đơn</Typography>
                      </IconButton>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Typography className="text-green-500">
                        Đã xuất hóa đơn
                      </Typography>
                    </TableCell>
                  )
                ) : 
                row.paymentStatus === true ? (
                  <TableCell>
                    <IconButton onClick={() => onEdit(row)}>
                    <LocalPrintshopIcon/>
                        <Typography>In hóa đơn</Typography>
                      </IconButton>
        
                  </TableCell>
                )
                :
                (
                  <TableCell/>
                
                )
                :
                (
                  <TableCell>
                    <IconButton onClick={() => onEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={
                        row.levelId
                          ? () => onDelete(row.electricTypeId, row.levelId)
                          : () => onDelete(row.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
