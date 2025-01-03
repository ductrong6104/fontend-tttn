// components/TableComponent.js
import React, { useState, useMemo } from "react";
import { formatDateForDisplay } from "../../utils/formatDate";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ComboboxComponent from "../combobox/comboboxComponent";
import HistoryIcon from '@mui/icons-material/History';
const TableComponent = ({ data, columns, onEdit, onDelete, presentName }) => {
  // Lấy danh sách các khóa của đối tượng đầu tiên làm tiêu đề bảng
  // Lấy tất cả các key từ data
  // const getAllKeys = (data) => {
  //   const keys = new Set();
  //   data.forEach((item) => {
  //     Object.keys(item).forEach((key) => keys.add(key));
  //   });
  //   return Array.from(keys);
  // };

  // const allKeys = useMemo(() => getAllKeys(data), [data]);
  // console.log(`allKeys: ${allKeys}`);
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerms, setSearchTerms] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: "" }), {})
  );

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && sortDirection === "asc";
    setSortDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (id) => (event) => {
    setSearchTerms({ ...searchTerms, [id]: event.target.value });
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every(({ id }) =>
        row[id] != null
          ? row[id]
              .toString()
              .toLowerCase()
              .includes(searchTerms[id].toString().toLowerCase())
          : true
      )
    );
  }, [data, searchTerms, columns]);

  const sortedData = useMemo(() => {
    return filteredData.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, orderBy, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, rowsPerPage]);

  const invoiceds = [
    { value: "true", label: "Đã thông báo" },
    { value: "false", label: "Chưa thông báo" },
  ];

  const powerMeterStatuses = [
    { value: "true", label: "Đang hoạt động" },
    { value: "false", label: "Ngừng hoạt động" },
  ];

  const statusAccounts = [
    { value: "false", label: "Hoạt động" },
    { value: "true", label: "Vô hiệu hóa" },
  ];

  return (
    <>
      <div className="flex flex-row">
        {columns.map(({ id, label }) =>
          id === "powerMeterId" ||
          id === "employeeIdAndFullName" ||
          id === "id" ||
          id === "electricTypeName" ||
          id === "nameStatus" ||
          id === "firstName" ||
          id === "lastName" ||
          id === "employeeNameAndId" || 
          id === "employeeIdAndFullName" ||
          id === "clientIdAndFullName" ||
          id === "name" ||
          id === "firstLevel" || 
          id === "secondLevel" ||
          id === "employeeIdAndName"
          ? (
            <div key={id} className="mr-2">
              <Typography>Tìm theo {label}</Typography>
              <TextField
                variant="outlined"
                size="small"
                value={searchTerms[id]}
                onChange={handleSearchChange(id)}
                placeholder={`Nhập ${label}`}
                style={{ marginLeft: 8 }}
                sx={{ marginTop: 2 }}
              />
            </div>
          ) : (
            id === "invoiced" ? (
              <div className="flex items-center">
                <ComboboxComponent
                  options={invoiceds}
                  label="Tìm theo trạng thái"
                  name={id}
                  value={searchTerms[id]}
                  onChange={handleSearchChange(id)}
                ></ComboboxComponent>
              </div>)
              : id === "powerMeterStatus" ? (
                <ComboboxComponent
                  options={powerMeterStatuses}
                  label="Tìm theo trạng thái"
                  name={id}
                  value={searchTerms[id]}
                  onChange={handleSearchChange(id)}
                ></ComboboxComponent>
              )
              : id === "disabled" ? (
<ComboboxComponent
                  options={statusAccounts}
                  label="Tìm theo trạng thái"
                  name={id}
                  value={searchTerms[id]}
                  onChange={handleSearchChange(id)}
                ></ComboboxComponent>
              ) :
              (<div></div>)
              // <div className="mr-2">
              //   <Typography sx={{ marginRight: 2 }}>
              //     Tìm theo {label}
              //   </Typography>
              //   <FormControl sx={{ width: 200 }} margin="normal">

              //     <Select
              //       name={id}
              //       value={searchTerms[id]}
              //       onChange={handleSearchChange(id)}
              //       // label="Tìm theo trạng thái"
              //       required
              //     >
              //       <MenuItem value="">Tất cả</MenuItem>
              //       {invoiceds.map((option) => (
              //         <MenuItem key={option.value} value={option.value}>
              //           {option.label}
              //         </MenuItem>
              //       ))}
              //     </Select>
              //   </FormControl>
              // </div>
            
          )
        )}
      </div>
      <Paper className="overflow-x-auto mt-2">
        <TableContainer className="max-h-screen overflow-auto">
          <MuiTable>
            <TableHead>
              <TableRow>
                {columns.map(({ id, label }) => (
                  <TableCell key={id} className="flex flex-col">
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
                        color:
                          id === "paymentStatus" ||
                          id === "disabled" ||
                          id === "resignation" ||
                          id === "invoiced" ||
                          id === "powerMeterStatus"
                            ? row.paymentStatus === true ||
                              row.disabled === false ||
                              row.resignation === false ||
                              row.invoiced === true ||
                              row.powerMeterStatus === true
                              ? "green"
                              : "red"
                            : id === "gender"
                            ? row.gender === true
                              ? "pink"
                              : "blue"
                            : "inherit",
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
                        : id === "disabled"
                        ? row.disabled === true
                          ? "Vô hiệu hóa"
                          : "Hoạt động"
                        : id === "resignation"
                        ? row.resignation === true
                          ? "Đã nghỉ việc"
                          : "Làm việc bình thường"
                        : id === "gender"
                        ? row.gender === true
                          ? "Nữ"
                          : "Nam"
                        : id === "invoiced"
                        ? row.invoiced === true
                          ? "Đã xuất thông báo"
                          : "Chưa xuất thông báo"
                        : id === "powerMeterStatus"
                        ? row.powerMeterStatus === true
                          ? "Đang hoạt động"
                          : "Ngừng hoạt động"
                        : row[id]}
                    </TableCell>
                  ))}
                  {presentName === "bill" ? (
                    row.oldIndex != null ? (
                      row.invoiced === false ? (
                        <TableCell>
                          <IconButton onClick={() => onEdit(row, 0)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => onDelete(row)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => onEdit(row, 1)}>
                            <ExitToAppIcon />
                            <Typography>Xuất thông báo</Typography>
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell></TableCell>
                      )
                    ) : row.paymentStatus === true ? (
                      <TableCell>
                        <IconButton onClick={() => onEdit(row)}>
                          <LocalPrintshopIcon />
                          <Typography sx={{ color: "green" }}>
                            In hóa đơn
                          </Typography>
                        </IconButton>
                      </TableCell>
                    ) : row.recordingDate !== null ? (
                      <TableCell>
                        <IconButton onClick={() => onEdit(row)}>
                          <LocalPrintshopIcon />
                          <Typography sx={{ color: "red" }}>
                            In thông báo
                          </Typography>
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )
                  ) : row.nameStatus === "Hoạt động" || row.nameStatus === "Chờ kết thúc" ? (
                    <TableCell>
                      <IconButton onClick={() => onEdit(row, 0)}>
                        <ExitToAppIcon />
                        <Typography sx={{ color: "red" }}>Kết thúc hợp đồng</Typography>
                      </IconButton>
                    </TableCell>
                  ) : row.nameStatus === "Kết thúc" ? (
                    <TableCell>
                    
                    </TableCell>
                  ) :  presentName === "Phân công" ? (
                    <TableCell>
                      <IconButton onClick={() => onEdit(row)}>
                      <EditIcon />
                        <Typography sx={{ color: "green" }}>Thay đổi nhân viên</Typography>
                      </IconButton>
                      <IconButton onClick={() => onDelete(row)}>
                      <HistoryIcon />
                        <Typography sx={{ color: "blue" }}>Lịch sử ghi điện</Typography>
                      </IconButton>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <IconButton onClick={() => onEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={
                          row.levelId
                            ? () => onDelete(row.electricTypeId, row.levelId)
                            : () => onDelete(row)
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
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </>
  );
};

export default TableComponent;
