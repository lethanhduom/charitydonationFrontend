import React, { useEffect } from "react";

const PayPalButton = () => {
  useEffect(() => {
    // Tải PayPal button SDK khi component được render
    if (window.paypal) {
      window.paypal.Buttons({
        // Khi nút được nhấn, tạo payment request
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00",  // Số tiền thanh toán, có thể thay bằng dynamic giá trị từ backend
                },
              },
            ],
          });
        },

        // Khi thanh toán thành công, thực hiện xử lý và hoàn tất
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            // Gửi dữ liệu kết quả thanh toán về backend của bạn nếu cần
          });
        },

        // Khi thanh toán bị hủy, thông báo cho người dùng
        onCancel: (data) => {
          alert("Payment was cancelled");
        },

        // Xử lý lỗi (nếu có)
        onError: (err) => {
          alert("An error occurred during the payment process");
        },
      }).render("#paypal-button-container"); // Render button vào div có id 'paypal-button-container'
    }
  }, []);

  return (
    <div>
      <h2>Pay with PayPal</h2>
      <div id="paypal-button-container"></div> {/* Đây là nơi nút PayPal sẽ hiển thị */}
    </div>
  );
};

export default PayPalButton;
