"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneratePDFBilPayment = exports.GeneratePDF = void 0;

var _jspdf = require("jspdf");

var _qrcode = _interopRequireDefault(require("qrcode"));

var _jspdfAutotable = _interopRequireDefault(require("jspdf-autotable"));

var _base = require("./base64");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var GeneratePDF = function GeneratePDF(formData) {
  var doc, x_inforPayment, qrCodeURL, qrCodeImage;
  return regeneratorRuntime.async(function GeneratePDF$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          doc = new _jspdf.jsPDF();
          x_inforPayment = 150;
          doc.addFileToVFS("Roboto-Regular.ttf", _base.base64_roboto);
          doc.addFont("Roboto-Regular.ttf", "roboto", "normal");
          doc.setFont("roboto"); // Tiêu đề

          doc.setFontSize(16);
          doc.text('TỔNG CÔNG TY ĐIỆN LỰC MIỀN TRUNG', 10, 10);
          doc.setFontSize(10);
          doc.text('Công ty TNHH Một Thành Viên Điện Lực Đà Nẵng', 10, 15);
          doc.text('35 Phan Đình Phùng, P. Hải Châu 1, Q. Hải Châu, TP Đà Nẵng', 10, 20);
          doc.text('Điện lực Thanh Khê', 10, 25);
          doc.text('141 Lý Thái Tông - TP Đà Nẵng', 10, 30); // Thông tin khách hàng

          doc.setFontSize(12); // doc.setTextColor(0, 0, 255); // Màu xanh dương (RGB)

          doc.text('THÔNG BÁO TIỀN ĐIỆN', 105, 40, null, null, 'center');
          doc.setFontSize(10);
          doc.text('Khách hàng: ' + formData.fullName, 10, 50);
          doc.text('Địa chỉ: ' + formData.address, 10, 55);
          doc.text('Điện thoại: ' + formData.phone, 10, 60);
          doc.text('Email: ' + formData.email, 10, 65);
          doc.text('Mã số thuế: ', 10, 70);
          doc.text('Địa chỉ sử dụng điện: ' + formData.electricitySupplyAddress, 10, 75);
          doc.text('Mục đích sử dụng điện: ' + formData.electricTypeName, 10, 80);
          doc.text('Số hộ dùng điện: 1', 10, 85); // Thông tin thanh toán

          doc.setTextColor(255, 255, 255);
          doc.setFillColor(0, 0, 255); // Màu nền (xanh dương)

          doc.rect(x_inforPayment - 5, 45, 40, 13, 'F'); // Vẽ hình chữ nhật có màu nền

          doc.text('Mã khách hàng', x_inforPayment, 50);
          doc.text(formData.clientId, x_inforPayment, 55);
          doc.setFillColor(0, 0, 255);
          doc.rect(x_inforPayment - 5, 60, 40, 13, 'F');
          doc.text('Số tiền thanh toán', x_inforPayment, 65);
          doc.text(formData.totalAmount, x_inforPayment, 70);
          doc.setFillColor(0, 0, 255);
          doc.rect(x_inforPayment - 5, 75, 40, 13, 'F');
          doc.text('Hạn thanh toán', x_inforPayment, 80);
          doc.text(formData.paymentDueDate, x_inforPayment, 85); // Tình hình sử dụng điện

          doc.setTextColor(0, 0, 0);
          doc.text('TÌNH HÌNH SỬ DỤNG ĐIỆN CỦA KHÁCH HÀNG', 10, 95);
          (0, _jspdfAutotable["default"])(doc, {
            startY: 100,
            head: [['Kỳ hóa đơn', 'Chỉ số cũ', 'Chỉ số mới', 'Số điện tiêu thụ']],
            body: [[formData.invoiceDate, formData.oldIndex, formData.newIndex, formData.newIndex - formData.oldIndex]],
            styles: {
              font: "roboto",
              // Đảm bảo sử dụng font đã tích hợp
              cellPadding: 5,
              fontSize: 12
            }
          }); // Thông tin khác

          doc.text('THANH TOÁN TRỰC TUYẾN', 10, 200);
          doc.text('Để thanh toán trực tuyến, vui lòng truy cập:', 10, 205);
          doc.text('https://cskh.cpc.vn', 10, 210);
          doc.text('và nhập mã khách hàng hoặc quét mã QR Code để thanh toán.', 10, 215); // Tạo QR Code

          _context.prev = 43;
          _context.next = 46;
          return regeneratorRuntime.awrap(_qrcode["default"].toDataURL('https://cskh.cpc.vn'));

        case 46:
          qrCodeURL = _context.sent;
          // Thêm QR Code vào PDF
          qrCodeImage = new Image();
          qrCodeImage.src = qrCodeURL;

          qrCodeImage.onload = function () {
            doc.addImage(qrCodeImage, 'PNG', 10, 225, 50, 50); // Thay đổi tọa độ và kích thước tùy ý
            // Lưu file PDF

            doc.save('invoice.pdf');
          };

          _context.next = 55;
          break;

        case 52:
          _context.prev = 52;
          _context.t0 = _context["catch"](43);
          console.error('Lỗi khi tạo QR Code:', _context.t0);

        case 55:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[43, 52]]);
};

exports.GeneratePDF = GeneratePDF;

var GeneratePDFBilPayment = function GeneratePDFBilPayment(formData) {
  var colors, doc, today, day, month, year, textCurrentDate;
  return regeneratorRuntime.async(function GeneratePDFBilPayment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          colors = {
            black: [0, 0, 0],
            white: [255, 255, 255],
            red: [255, 0, 0],
            green: [0, 255, 0],
            blue: [0, 0, 255],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            purple: [128, 0, 128],
            gray: [128, 128, 128],
            pink: [255, 192, 203]
          };
          doc = new _jspdf.jsPDF();
          doc.addFileToVFS("Roboto-Regular.ttf", _base.base64_roboto);
          doc.addFont("Roboto-Regular.ttf", "roboto", "normal");
          doc.setFont("roboto"); // Set text properties

          doc.setFontSize(12);
          doc.setTextColor.apply(doc, _toConsumableArray(colors.red)); // Add text to the doc (example, adjust positions as necessary)

          doc.text('CHI NHÁNH TỔNG CÔNG TY ĐIỆN LỰC TP HỒ CHÍ MINH', 10, 10);
          doc.setTextColor.apply(doc, _toConsumableArray(colors.black));
          doc.text('Số 01 Đường Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP Hồ Chí Minh, Việt Nam', 10, 15);
          doc.text('Mã số thuế: 0300915119-001', 10, 20);
          doc.text('Điện thoại: 1900545454', 10, 25);
          doc.text('Số tài khoản: 4211100005000698 - TMCP An Bình', 10, 30);
          doc.setTextColor.apply(doc, _toConsumableArray(colors.red)); // Add more text as per the invoice fields (example)

          doc.text('HÓA ĐƠN GIÁ TRỊ GIA TĂNG', 105, 40, {
            align: 'center'
          });
          doc.setTextColor.apply(doc, _toConsumableArray(colors.black)); // Lấy ngày hiện tại

          today = new Date();
          day = today.getDate();
          month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

          year = today.getFullYear(); // Định dạng văn bản với ngày hiện tại

          textCurrentDate = "Ng\xE0y ".concat(day, " th\xE1ng ").concat(month, " n\u0103m ").concat(year);
          doc.text(textCurrentDate, 105, 50, {
            align: 'center'
          });
          doc.text('Họ tên người dùng: ' + formData.fullName, 10, 55);
          doc.text('Tên đơn vị: ', 10, 60);
          doc.text('Mã số thuế: ', 10, 65);
          doc.text('Địa chỉ: ' + formData.address, 10, 70);
          doc.text('Số tài khoản: ', 10, 75);
          doc.text('Hình thức thanh toán: ', 10, 80);
          doc.text('Đồng tiền thanh toán: VND', 125, 80);
          (0, _jspdfAutotable["default"])(doc, {
            startY: 100,
            head: [['STT', 'Tên hàng hóa, dịch vụ', 'ĐVT', 'Số lượng', 'Đơn giá', 'Thành tiền']],
            body: [['1', 'Điện tiêu thụ từ ngày ' + formData.fromDate + ' đến ngày ' + formData.toDate, 'kWh', formData.consumption, formData.price, formData.totalAmount]],
            styles: {
              font: "roboto",
              // Đảm bảo sử dụng font đã tích hợp
              cellPadding: 5,
              fontSize: 12
            }
          });
          doc.setTextColor.apply(doc, _toConsumableArray(colors.green));
          doc.text('Người bán hàng:', 10, 160);
          doc.text('Người mua hàng:', 125, 160); // Save the doc

          doc.save('invoice.pdf');

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.GeneratePDFBilPayment = GeneratePDFBilPayment;