import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import Button from '@mui/material/Button';
import CampaignDetail from './CampaignDetail';
import Modal from '@mui/material/Modal';

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-top: 16px;
`;

const SubTitle = styled.p`
  color: #888;
  margin: 8px 0;
`;

const Amount = styled.p`
  font-weight: bold;
  margin: 8px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const Card = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <CardContainer>
      <Image src="https://via.placeholder.com/400x200" alt="Fundraising Image" />
      <Title>Gây quỹ cọng tay trao "Món quà được học"</Title>
      <SubTitle>Hands-On</SubTitle>
      <Amount>11,145,226đ / 150,000,000đ</Amount>
      <ProgressBar completed={7} />
      <Footer>
        <span>1,084 lượt quyên góp</span>
        <CampaignDetail />
      </Footer>

      {/* <Modal open={open} onClose={handleClose}>
        <div>
          <CampaignDetail />
        </div>
      </Modal> */}

    </CardContainer>
  );
};

export default Card;
