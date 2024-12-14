import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getListDonationbyId } from '../../../Service/DonationService';
const Modal = ({ onClose,data }) => {
  const [listDonation,setListDonation]=useState([]);
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "600px",
      width: "90%",
      overflowY: "auto", // Thêm thanh cuộn nếu nội dung quá dài
      maxHeight: "90vh", // Giới hạn chiều cao modal
    },
    modalTitle: {
      fontSize: "20px",
      marginBottom: "15px",
      textAlign: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "15px",
    },
    tableHeader: {
      borderBottom: "2px solid #ddd",
      padding: "12px",
      textAlign: "center", // Căn giữa tiêu đề cột
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#f8f9fa", // Màu nền nhạt cho tiêu đề cột
    },
    tableCell: {
      borderBottom: "1px solid #ddd",
      padding: "12px",
      fontSize: "14px",
      textAlign: "center", // Căn giữa dữ liệu trong cột
    },
    closeButton: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
    },
  };
  
useEffect (()=>{
    if(data!=null){
        getListDonationbyId(data).then(res=>{
            setListDonation(res.data);
        })
    }
})

  return ReactDOM.createPortal(
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>List of Donators</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Donation Amount</th>
            </tr>
          </thead>
          <tbody>
            {listDonation.map((item, index) => (
              <tr key={item.idDonation}>
                <td style={styles.tableCell}>{item.accountDto?.accountDto||"Ẩn danh"}</td>
                <td style={styles.tableCell}>{item?.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};
export default Modal;
