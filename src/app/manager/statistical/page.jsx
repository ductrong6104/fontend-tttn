'use client'

import { jsPDF } from 'jspdf';

import autoTable from 'jspdf-autotable';
import {base64_roboto} from '@/utils/base64'




export default function PageManagedStatistical (){


    const generatePDF = () => {
        const doc = new jsPDF();
        doc.addFileToVFS("Roboto-Regular.ttf", base64_roboto);
        doc.addFont("Roboto-Regular.ttf", "roboto", "normal");
        doc.setFont("roboto");
       // Tiêu đề
        doc.setFontSize(16);
        doc.text('TỔNG CÔNG TY ĐIỆN LỰC MIỀN TRUNG', 10, 10);
        doc.setFontSize(10);
        doc.text('Công ty TNHH Một Thành Viên Điện Lực Đà Nẵng', 10, 15);
        doc.text('35 Phan Đình Phùng, P. Hải Châu 1, Q. Hải Châu, TP Đà Nẵng', 10, 20);
        doc.text('Điện lực Thanh Khê', 10, 25);
        doc.text('141 Lý Thái Tông - TP Đà Nẵng', 10, 30);

        // Thông tin khách hàng
        doc.setFontSize(12);
        // Thay đổi màu văn bản cho đoạn tiếp theo
        doc.setTextColor(0, 0, 255); // Màu xanh dương (RGB)
        doc.text('THÔNG BÁO TIỀN ĐIỆN', 105, 40, null, null, 'center');
        doc.setFontSize(10);
        doc.text('Khách hàng: Nguyễn Văn A', 10, 50);
        doc.text('Địa chỉ: Phan Đình Phùng, P. Hải Châu 1, Q. Hải Châu, TP Đà Nẵng', 10, 55);
        doc.text('Điện thoại: 0909 000 000', 10, 60);
        doc.text('Email: ', 10, 65);
        doc.text('Mã số thuế: ', 10, 70);
        doc.text('Địa chỉ sử dụng điện: Phan Đình Phùng, P. Hải Châu 1, Q. Hải Châu, TP Đà Nẵng', 10, 75);
        doc.text('Mục đích sử dụng điện: Sinh hoạt', 10, 80);
        doc.text('Số hộ dùng điện: 1', 10, 85);

        // Tình hình sử dụng điện
        doc.text('TÌNH HÌNH SỬ DỤNG ĐIỆN CỦA KHÁCH HÀNG', 10, 95);

        autoTable(doc, {
            startY: 100,
            head: [['Kỳ hóa đơn', 'Chỉ số cũ', 'Chỉ số mới', 'Số điện tiêu thụ']],
            body: [
            ['Kỳ 1 - Tháng 3/2020', '290', '320', '30']
            ],
            styles: {
                font: "roboto",  // Đảm bảo sử dụng font đã tích hợp
                cellPadding: 5,
                fontSize: 12
            }
        });

        // Thông tin thanh toán
        doc.text('THÔNG TIN THANH TOÁN', 105, 140, null, null, 'center');
        doc.text('Mã khách hàng', 105, 150, null, null, 'center');
        doc.text('PP9000111222', 105, 155, null, null, 'center');
        doc.text('Số tiền thanh toán', 105, 165, null, null, 'center');
        doc.text('42.453 đồng', 105, 170, null, null, 'center');
        doc.text('Hạn thanh toán', 105, 180, null, null, 'center');
        doc.text('09/03/2020', 105, 185, null, null, 'center');

        // Thông tin khác
        doc.text('THANH TOÁN TRỰC TUYẾN', 10, 200);
        doc.text('Để thanh toán trực tuyến, vui lòng truy cập:', 10, 205);
        doc.text('https://cskh.cpc.vn', 10, 210);
        doc.text('và nhập mã khách hàng hoặc quét mã QR Code để thanh toán.', 10, 215);

        // Lưu file PDF
        doc.save('invoice.pdf')

    };

    return (
        <div>
            <h1>Invoice</h1>
            <button onClick={generatePDF}>Generate PDF</button>
          
        </div>
    );
    
}