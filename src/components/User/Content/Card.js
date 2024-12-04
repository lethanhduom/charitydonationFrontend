
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import Button from '@mui/material/Button';
import { CampaginDisplayUser } from '../../../Service/UserService';
import { getImageRepresent } from '../../../Service/Campaign';
import CampaignDetail from './CampaignDetail';
import Modal from '@mui/material/Modal';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;

const CardContain = styled.div`
flex: 0 1 calc(33.333% - 16px); 
  box-sizing: border-box;
  background: #fff;
  border-radius: 8px;
  max-width: 400px;
  height: 450px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-radius: 12px;
`;

const Image = styled.img`
  width: 400px;
  height: 200px;
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

  const [campaignList,setCampaignList]=useState([]);
  const navigate=useNavigate();
  const handleClick=(id)=>{
    // <Link to={"/campaign/"+id}></Link>
  navigate("/campaign/"+id);
    // alert(id)
  }
 
  useEffect((async)=>{
    CampaginDisplayUser(0,9).then((response)=>{
      // setCampaignList(response.data.content)
      const campaigns = response.data.content;
      const updatedCampaigns = [...campaigns]; 

      response.data.content.forEach((campaign,index) => {
        getImageRepresent(campaign.idCampaign).then(imageRes=>{
          updatedCampaigns[index] = { ...campaign, campaignimages: imageRes.data.urlImage };
          if (index === updatedCampaigns.length - 1) {
            setCampaignList(updatedCampaigns); // Cập nhật state khi hoàn tất
          }
          // alert(imageRes.data.urlImage)
          // alert(campaignList.campaignimages.urlImage)
        })
      });
    
     console.log(campaignList)

    })
  },[])


  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
  
   
    <CardContainer>
 {campaignList.map((campaign,index)=>(
  <CardContain key={index}>

      <Image src={campaign.campaignimages} alt="Fundraising Image" />
      
      <Title>{campaign.campaignName}</Title>
      
      <SubTitle>Hands-On</SubTitle>
      <Amount>{campaign.currentAmmout}đ / {campaign.targetAmount}đ</Amount>
      <ProgressBar completed={7} />
      <Footer>
        <span>1,084 lượt quyên góp</span>
        {/* <CampaignDetail /> */}
        <Button
                className='outlined'
              onClick={()=>handleClick(campaign.idCampaign)}
            >Quyên góp</Button>
      </Footer>

      </CardContain>
 ))}
    


      {/* <Modal open={open} onClose={handleClose}>
        <div>
          <CampaignDetail />
        </div>
      </Modal> */}

    </CardContainer>
  );
};


export default Card;
