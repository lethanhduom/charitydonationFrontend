import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ProgressBar from "./ProgressBar";
import { Dialog } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";
import { ButtonGroup } from "react-bootstrap";

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
const CampaignDetail = () => {
    const storyRef = useRef(null);
    const donorsRef = useRef(null);
    const newsRef = useRef(null);
    const backgroundRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const scrollToRef = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const smallImages = [
        "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128165634-638684097945553593.jpg",
        "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128170155-638684101158420473.jpg",
        "https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128170203-638684101237830779.jpg",
    ];
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
            <Button
                className='outlined'
                onClick={handleClickOpen}
            >Quyên góp</Button>
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
                        <Title>Chung tay xây cầu mới cho thôn Bản Khun, xã Yên Cường, huyện Bắc Mê, tỉnh Hà Giang</Title>
                        <Description>
                            ❤️ Cây cầu kiên cố sẽ có ý nghĩa lớn đối với nhân dân thôn Bản Khun và các thôn lân cận, tạo điều kiện
                            thuận lợi cho bà con nhân dân trên địa bàn đi lại, giao thương dễ dàng hơn, qua đó góp phần cho kinh tế địa
                            phương ngày càng phát triển.
                        </Description>
                        <Date>28/11/2024</Date>

                        <ContentWrapper>
                            {/* Hình ảnh */}
                            <ImageContainer>
                                <LargeImage src={currentImage} alt="Main Campaign" />
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

                                <DonateButton variant="contained">Quyên góp</DonateButton>
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
                            Xã Yên Cường là một trong những địa phương vùng sâu, vùng xa, khó khăn của huyện Bắc Mê, tỉnh Hà Giang. Xã
                            có 11 dân tộc anh em cùng sinh sống tại 17 thôn có 7.495 khẩu với 1.372 hộ; gồm các dân tộc Mông, Tày, Kinh,
                            Dao, Nùng...
                        </p>
                        <img src="https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-241128165735-638684098556122216.jpg" alt="Story " />
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
