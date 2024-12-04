import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ProgressBar from "./ProgressBar";
import { Dialog, TextField } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";
import { ButtonGroup, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCampaign } from "../../../Service/Campaign";
import { getImage } from "../../../Service/Campaign";
import Modal1 from '@mui/material/Modal';
import { CreateVNpay } from "../../../Service/VNpay";
import { getAccountByUserName } from "../../../Service/AccountService";
import { introspect } from "../../../Service/AccountService";
import { jwtDecode } from "jwt-decode";
const CampaignDetailContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const Date = styled.span`
  display: block;
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageContainer = styled.div`
  flex: 2;
`;

const LargeImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const SmallImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

`;

const SmallImage = styled.img`
  border-style:solid;
  border-color: #fff2f3;
  padding: 1px;
  width: 80px;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  object-fit: cover;
`;

const Sidebar = styled.div`
  flex: 1;
`;

const PartnerInfo = styled.div`
  margin-bottom: 20px;
`;

const PartnerItem = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const DonationInfo = styled.div`
  margin-bottom: 20px;
`;

const Amount = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Stats = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const DonateButton = styled(Button)`
  background-color: #ff3366 !important;
  color: #fff !important;
  font-weight: bold !important;
  width: 100%;
`;
const HouseDonorsList = styled.div`
  margin-top: 20px;
`;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const DonorItem = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const columns = [
    {
        field: 'index',
        headerName: '',
        width: 50,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return params.api.getAllRowIds().indexOf(params.id) + 1;
        }
    },
    {
        field: 'donorName',
        headerName: 'Nhà hảo tâm',
        width: 350,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'money',
        headerName: 'Tiền quyên góp',
        width: 350,
        align: 'center',
        headerAlign: 'center',
    }
]
const CampaignDetail = (async) => {
   
    const navigate=useNavigate();
    const storyRef = useRef(null);
    const donorsRef = useRef(null);
    const newsRef = useRef(null);
    const backgroundRef = useRef(null);
    const [open, setOpen] = useState(true);
    const { id } = useParams();
    const [campaign,setCampaign]=useState({});
    const [imageCampaign,setImageCampaign]=useState([])
    const [openSelect,setOpenSelect]=useState(false);
    const [money,setMoney]=useState()
    const [account,setAccount]=useState()
    // const []
    const handleClose = () => {
        navigate("/");
    };
    const handleOpen=()=>{
        setOpenSelect(true);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const scrollToRef = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    // const [smallImages,setSmallImages]=useState([]);
    const [smallImages, setSmallImage] = useState([]);
   useEffect(() => {

    Promise.all([
        getDetailCampaign(id),
        getImage(id)
    ]).then(([resCampaign,resImage])=>{
        setCampaign(resCampaign.data);
        setImageCampaign(resImage.data);
    })
    .catch((err) => {
        console.error('Lỗi khi gọi API:', err);
      });


  }, [id]);

  useEffect(() => {
    // Truyền chỉ các URL từ mảng imageCampaign vào mảng smallImage
    const urls = imageCampaign.map(image => image.urlImage); 
    setSmallImage(urls); 
    console.log(smallImages)
  }, [imageCampaign]); 

  const handleVNPay=async(amount)=>{
//    CreateVNpay(amount).then((res)=>{
//     console.log(res.data)
//     const token =localStorage.getItem('saveToken');

    // const decodedToken = jwtDecode(token);
   
    // alert(resIntro.data)
    //    const response=await getAccountByUserName(decodedToken.sub);
    // const inforPayment=()
//     localStorage.setItem("inforPayment",)
//     window.location.href=res.data
//    })
const token =localStorage.getItem('userToken');
      const res= await introspect(token);
      
      if(res.data.valid===true){
        const decodedToken = jwtDecode(token);
        const resAccount=await getAccountByUserName(decodedToken.sub);
        const inforPayment=({
            amount:amount,
            idCampaign:id,
            idAccount:resAccount.data.idAccount
        });
        localStorage.setItem("inforPayment",JSON.stringify(inforPayment));
      }else{
        const inforPayment=({
            amount:amount,
            idCampaign:id,
            idAccount:0
            
          
        })
        localStorage.setItem("inforPayment",JSON.stringify(inforPayment));
      }
      const resVnPay= await CreateVNpay(amount);
      window.location.href=resVnPay.data;


  }
//  
        
    // )
    // const smallImages = [
    //     "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128165634-638684097945553593.jpg",
    //     "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128170155-638684101158420473.jpg",
    //     "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128170203-638684101237830779.jpg",
    // ];
    
   
    const [currentImage, setCurrentImage] = useState(smallImages[0]);
    const donorLists = [
        {
            'id': 1,
            'donorName': 'Nguyễn Phương Linh',
            'money': 300000
        },
        {
            'id': 2,
            'donorName': 'Nguyễn Quốc Bình',
            'money': 240000
        }
    ]
    return (
        
        <>
          {openSelect&& <Modal1
  open={true}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Row>
          <Col xs={12} md={12}>
            Enter Your Money
            <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        onChange={e=>setMoney(e.target.value)}
                        fullWidth
                        required
                    />

                
          </Col>
          </Row>
          <Row   className="d-flex justify-content-end align-items-center">
       <Col xs="auto">
       <button type="button" className="btn btn-outline-success">Close</button>
       
       </Col>
       <Col xs="auto">
       
       <button type="submit" onClick={()=>handleVNPay(money)} className="btn btn-outline-warning">Accept</button>
       </Col>
       </Row>
  </Box>
</Modal1>
          }
            {/* <Button
                className='outlined'
                onClick={handleClickOpen}
            >Quyên góp</Button> */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                disablePortal
            >
                <AppBar sx={{
                    position: 'relative',
                    background: '#f8c7d4'
                }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 'bold', fontSize: 24 }} variant="h6" component="div">
                            Câu chuyện
                        </Typography>

                    </Toolbar>
                </AppBar>

                <CampaignDetailContainer>
                    <div ref={backgroundRef}>

                        <Title>
                        {campaign.campaignName}
                        </Title>
                        <Description>
                       
                        </Description>
                        <Date>28/11/2024</Date>

                        <ContentWrapper>
                            {/* Hình ảnh */}
                            <ImageContainer>
                                <LargeImage src={currentImage} />
                                <SmallImageWrapper >
                                    {smallImages.map((image, index) => (
                                        <SmallImage

                                            key={index}
                                            src={image}
                                            alt={`Small ${index + 1}`}
                                            onClick={() => setCurrentImage(image)} />
                                    ))}
                                </SmallImageWrapper>
                            </ImageContainer>

                            {/* Sidebar thông tin */}
                            <Sidebar>
                                <PartnerInfo>
                                    <h3>Thông tin quyên góp</h3>
                                    <PartnerItem>Đồng hành cùng dự án: Trường Đại học Sài Gòn </PartnerItem>

                                </PartnerInfo>

                                <DonationInfo>
                                    <Amount>3,528,111đ / 200,000,000đ</Amount>
                                    <ProgressBar completed={1.76} /> {/* % đạt được */}
                                    <Stats>
                                        <div>Lượt quyên góp: 486</div>
                                        <div>Đạt được: 1%</div>
                                        <div>Thời hạn còn: 71 ngày</div>
                                    </Stats>
                                </DonationInfo>

                                <DonateButton onClick={()=>handleOpen()} variant="contained">Quyên góp</DonateButton>
                            </Sidebar>
                        </ContentWrapper>
                    </div>

                    {/* Phần câu chuyện */}

                    <Box
                        sx={
                            {
                                marginTop: 5,
                                marginBottom: 5,
                                borderBottom: 1,
                                borderColor: 'divider',
                                display: 'flex',

                            }}>
                        <ButtonGroup >
                            <Button
                                onClick={() => scrollToRef(storyRef)}

                                sx={{
                                    borderBottom: 4,
                                    borderColor: '#ffa2a2',
                                    color: '#ff3366',
                                    marginRight: 3
                                }}
                            >Câu chuyện</Button>


                            <Button
                                onClick={() => scrollToRef(donorsRef)}

                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    color: '#ff3366',
                                    marginRight: 3
                                }}
                            >Nhà hảo tâm</Button>

                            <Button
                                onClick={() => scrollToRef(newsRef)}

                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    color: '#ff3366',
                                    marginRight: 3
                                }}
                            >Tin tức cộng đồng</Button>

                            <Button
                                onClick={() => scrollToRef(backgroundRef)}

                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    color: '#ff3366',
                                    marginRight: 3
                                }}
                            >Hoàn cảnh</Button>
                        </ButtonGroup>
                    </Box>
                    <div ref={storyRef}>
                        <Typography
                            sx={{
                                marginBottom: 2,
                                fontWeight: 'bold',
                                fontSize: '24px'
                            }}>
                            Câu chuyện
                        </Typography>
                        <p>
                            {campaign.content}
                        </p>
                        <img src={smallImages[0]} alt="Story " />
                    </div>

                    {/* Phần nhà hảo tâm */}
                    <div ref={donorsRef}

                    >
                        <Typography
                            sx={{
                                marginTop: 10,
                                marginBottom: 2,
                                fontWeight: 'bold',
                                fontSize: '24px'
                            }}>
                            Nhà hảo tâm hàng đầu
                        </Typography>
                        <Box
                            sx={{ width: '800px', maxHeight: '500' }}
                        >
                            <DataGrid

                                rows={donorLists}
                                columns={columns}
                            >
                            </DataGrid>
                        </Box>

                    </div>

                    {/* Phần tin tức cộng đồng */}
                    <div ref={newsRef}>
                        <Typography
                            sx={{
                                marginTop: 10,
                                marginBottom: 2,
                                fontWeight: 'bold',
                                fontSize: '24px'
                            }}>
                            Tin tức cộng đồng
                        </Typography>

                        <p>
                            Cầu thôn Bản Khun hiện nay đã hư hỏng nặng nề, ảnh hưởng đến cuộc sống của người dân nơi đây. Việc xây dựng cầu
                            mới là một phần trong nỗ lực cải thiện điều kiện sống của người dân.
                        </p>
                        <img src="https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128165735-638684098556122216.jpg" alt="News " />
                    </div>
                </CampaignDetailContainer>
            </Dialog>
        </>

    );
};

export default CampaignDetail;
