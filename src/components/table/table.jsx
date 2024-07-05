  import React from 'react';
  import { format } from 'date-fns';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { usePathname } from 'next/navigation';
  import ButtonCustom from '../button/button';
  const Table = ({ data, headerNames, setData, sortConfig, setSortConfig}) => {
    if (!data || data.length === 0) return <p>No data available</p>;

    // Lấy danh sách các khóa của đối tượng đầu tiên làm tiêu đề bảng
    const headers = Object.keys(data[0]);
    console.log(`headers: ${headers}`)
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 3;
    const router = useRouter();
    const pathname = usePathname()
    // Tính toán số lượng trang
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Lấy dữ liệu cho trang hiện tại
    const currentData = data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    // Xử lý sự kiện khi chuyển trang
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleClickEdit = (id) => {
      // Lấy đường dẫn hiện tại
      router.push(`${pathname}/edit/${id}`)
    }

    const handleSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
      console.log(sortConfig)
      const sortedRooms = [...data].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setData(sortedRooms);
    };
    
    // Hàm định dạng ngày tháng
    const formatDate = (dateString) => {
      const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
      };
      const date = new Date(dateString);
      console.log(date.toLocaleDateString('en-GB', options).replace(',', ''));
      return date.toLocaleDateString('en-GB', options).replace(',', '');
  };
    return (
      <div className='flex justify-center flex-col'>
      <div className='overflow-x-auto'>
        <table className='bg-blue mb-2 w-full'>
          <thead>
            <tr className='bg-blue-400 text-white'>
              {headerNames.map((header, index) => (
                <th className='p-2 border-2 rounded-md' key={header}>
                  {header}
                  <span
                    className='cursor-pointer'
                    onClick={() => handleSort(headers[index])}
                  >
                    ⬆️⬇️
                  </span>
                </th>
              ))}
              <th>Thay đổi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0
                    ? 'bg-slate-200'
                    : 'bg-slate-300 text-blue-500'
                }`}
              >
                {headers.map((header) => {
                  let cellContent;
                  if (header === 'birthday')
                    cellContent = format(new Date(row[header]), 'dd/MM/yyyy');
                  else cellContent = row[header];
                  return (
                    <td key={header} className={`text-center p-4`}>
                      {cellContent}
                    </td>
                  );
                })}

                <td className='text-center'>
                  {row.status == null && (
                    <div className='flex justify-center'>
                      <ButtonCustom handleClick={() => handleClickEdit(row.id)}>
                        Chỉnh sửa
                      </ButtonCustom>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end'>
        <div className='pagination flex items-center'>
          <div className='mr-2'>Trang: </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className='mr-2 p-2 border-2 rounded-md border-black w-10 h-10'
            >
              {`${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
    );
  };

  export default Table;
