// Định dạng ngày tháng để hiển thị trên giao diện (dd-MM-yyyy)
import format from 'date-fns/format';
export const formatDateForDisplay = (date) => {
    return format(date, 'dd-MM-yyyy');
  };
  export const formatMonth = (date) => {
    return format(date, 'MM-yyyy');
  }
  // Định dạng ngày tháng để lưu vào cơ sở dữ liệu (yyyy-MM-dd)
export const formatDateForDatabase = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  export const cuttingString = (str) => {
    const parts = str.split('-')
    return parts[0]
  }