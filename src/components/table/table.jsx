  import React from 'react';
  import { format } from 'date-fns';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { usePathname } from 'next/navigation';
  import ButtonCustom from '../button/button';

import {  formatDateForDisplay } from '@/utils/formatDate';
  const Table = ({representName, data, headerNames, setData, sortConfig, setSortConfig, title, handleClickEdit}) => {
    if (!data || data.length === 0) return <p>Hiện không có đơn nào</p>;

    // Lấy danh sách các khóa của đối tượng đầu tiên làm tiêu đề bảng
    const headers = Object.keys(data[0]);
    console.log(`headers: ${headers}`)
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 6;
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

    const getButtonText = () => {
      let buttonText;

      if (representName === 'register') {
        buttonText = 'Xác nhận';
      }  else if (representName === 'electric-recording') {
        buttonText = 'Xuất hóa đơn';
      }
      else{
        buttonText = 'Cập nhật';
      }

      return buttonText;
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
    

    
    return (
      <div className='flex justify-center flex-col'>
        <div className='flex justify-center '>
          <div className='text-blue-600 text-2xl'>{title}</div>
        </div>

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
              <th>Thực hiện</th>
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
                  let style
                  if (header === 'birthday' || header === 'startDate' || (header === 'endDate' && row.endDate != null) || header === 'installationDate' || header === 'recordingDate')
                    cellContent = formatDateForDisplay(new Date(row[header]), 'dd/MM/yyyy');
                  else if (header === 'status'){
                    if (row.status === true)
                      cellContent = 'Đang sử dụng'
                    if (row.status === false){
                      cellContent = 'Ngừng sử dụng'
                     
                    }
                  }
                  
                  else cellContent = row[header];
                  return (
                    <td key={header} className={`text-center p-4 ${header==='status' ? (row.status === true ? 'text-green-600' : 'text-red-600'): ''}`}>
                      {cellContent} 
                    </td>
                  );
                })}

                <td className='text-center'>
                    <div className='flex justify-center'>
                      {
                        representName === 'contract' &&(
                          row.endDate === null ?       
                       
                          (
                            <ButtonCustom className='bg-red-400 whitespace-nowrap' onClick={() => handleClickEdit(row.contractId, 0)}>
                              Kết thúc hợp đồng
                          </ButtonCustom>
                          )
                        : 
                          
                          (
                          //   <ButtonCustom className='bg-stone-400 whitespace-nowrap' onClick={() => handleClickEdit(row.contractId, 1)}>
                          //   Gia hạn hợp đồng
                          // </ButtonCustom>
                          null
                          )
                        )
                       
                        
                      }
                      {
                        representName != 'contract' && representName != 'register' && (
                          <ButtonCustom className='bg-orange-200 whitespace-nowrap' onClick={() => handleClickEdit(row)}>
                            {getButtonText()}
                          </ButtonCustom>
                        )
                      }
                      {representName === 'register' && (
                        <div className='flex'>

                                <ButtonCustom className='bg-green-400 whitespace-nowrap' onClick={() => handleClickEdit(row, 1)}>
                                Xác nhận
                            </ButtonCustom>
                            <ButtonCustom className='bg-red-400 whitespace-nowrap' onClick={() => handleClickEdit(row, 0)}>
                            Từ chối
                        </ButtonCustom>
                        </div>
                      )}
                      
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
