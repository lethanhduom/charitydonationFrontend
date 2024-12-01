import React from 'react';
import styled from 'styled-components';
import Counter from './Counter';
import image from '../Images/section2.png'
const HeroContainer = styled.div`
  background-color:  #F8C7D4;
  text-align: center;
  border-radius: 16px;
  max-width: 100%;
  height: 450px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #d63f8c;
  font-size: 36px;
  margin-bottom: 20px;
  padding-top:50px;
`;
const SectionLeft =styled.div`
flex: 1;  
padding-right: 20px;
float: left;
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.p`
  margin-top: 10px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  /* background-color: #d63f8c; */
  /* color: #fff; */
  /* border: none; */
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  /* &:hover {
    background-color: #b83678;
  } */

  /* &:nth-child() { */
    background-color: #fff;
    color: #d63f8c;
    border: 2px solid #d63f8c;

    &:hover {
      background-color: #ffd1e5;
    }
  /* } */
`;

const Section = () => {
  return (
    <HeroContainer>
   <SectionLeft>
   <img style={{width:"350px", height:"350px"}}src={image}/>
   </SectionLeft>
    <Title>Nền tảng quyên góp từ thiện trường Đại học Sài Gòn</Title>
      <SubTitle>
      Từ trái tim sinh viên, chúng ta trao đi những giá trị yêu thương, 
      sẻ chia và giúp đỡ, hướng tới một cộng đồng mạnh mẽ và nhân ái hơn.
      </SubTitle>
     
      <StatsContainer>
        <StatItem>
          <h2><Counter end={702} duration={2000} /></h2>
          <StatLabel>dự án đã được gây quỹ thành công</StatLabel>
        </StatItem>
        <StatItem>
          <h2><Counter end={94} duration={2000} />+ tỷ</h2>
          <StatLabel>đồng được quyên góp</StatLabel>
        </StatItem>
        <StatItem>
          <h2><Counter end={21} duration={2000} />+ triệu</h2>
          <StatLabel>lượt quyên góp</StatLabel>
        </StatItem>
      </StatsContainer>
     
       
  
      <ButtonContainer>
        <Button>Quyên góp</Button>
        <Button>Giới thiệu</Button>
      </ButtonContainer>
  
  
    </HeroContainer>
  );
};

export default Section;
