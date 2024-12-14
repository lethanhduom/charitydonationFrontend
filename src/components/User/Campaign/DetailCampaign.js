import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Pagination } from '@mui/material';
import { getListShowDonationUer } from '../../../Service/DonationService';
import { getAccountByUserName } from '../../../Service/AccountService';
import { getListShowDonationUser } from '../../../Service/DonationService';
const DetailPage = () => {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Bắt đầu từ trang 1
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5); // Số lượng phần tử mỗi trang
  const [getAccount,setaccount]=useState({});
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      marginTop: '150px', // Khoảng cách với header
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
      borderBottom: '2px solid #ddd',
      padding: '10px',
      textAlign: 'center',
    },
    tableCell: {
      borderBottom: '1px solid #ddd',
      padding: '10px',
      textAlign: 'center',
    },
    progressBarContainer: {
      height: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      overflow: 'hidden',
      margin: '10px 0',
    },
    progressBar: (percent) => ({
      width: `${percent}%`,
      height: '100%',
      backgroundColor: percent >= 100 ? '#28a745' : '#007bff',
      textAlign: 'right',
      color: 'white',
      padding: '0 5px',
      borderRadius: '10px',
    }),
    noData: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#888',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const decodeToken= jwtDecode(token);
        const getUserName=decodeToken.sub;
        const res=await getAccountByUserName(getUserName);
        console.log(res.data);
        setaccount(res.data);
        const dataForm=new FormData();
        dataForm.append("page",currentPage);
        dataForm.append("size",pageSize);
        dataForm.append("id",res.data.idAccount);
        const response = await getListShowDonationUser(dataForm);

        setDonations(response.data.content); // Get donations
        setTotalPages(response.data.totalPages); // Total pages from the response
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, [currentPage, pageSize]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Cập nhật trang hiện tại
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Donations</h1>
      {donations.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Campaign</th>
              <th style={styles.tableHeader}>Amount Donated</th>
            
              <th style={styles.tableHeader}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => {
              const progressPercent = ((donation.campaignsDto.currentAmmout / donation.campaignsDto.targetAmount) * 100).toFixed(2);
              return (
                <tr key={donation.campaignId}>
                  <td style={styles.tableCell}>{donation.campaignsDto.campaignName}</td>
                  <td style={styles.tableCell}>{donation.amount} VND</td>
               
                  <td style={styles.tableCell}>
                    <div style={styles.progressBarContainer}>
                      <div style={styles.progressBar(progressPercent)}>{progressPercent}%</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p style={styles.noData}>You have not made any donations yet.</p>
      )}

      {/* Pagination */}
      <div style={styles.paginationContainer}>
        <Pagination
          count={totalPages} // Tổng số trang
          page={currentPage} // Trang hiện tại
          onChange={handlePageChange} // Xử lý sự kiện khi thay đổi trang
          color="primary"
        />
      </div>
    </div>
  );
};

export default DetailPage;
