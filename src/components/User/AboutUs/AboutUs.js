import Grid from '@mui/material/Grid2';
import SkyImg from '../Images/sky1.jpg';
import Header from '../Header/Header';
import { Box } from "@mui/material";
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import HomeIntroduce from '../Content/HomeIntroduce';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {

    const navigate = useNavigate(); // Hook để điều hướng

    const handleNavigation = () => {
        navigate('/addCampaign');
    };
    return (
        <>
            <Header />
            <Grid container sx={{ backgroundImage: `url(${SkyImg})`, height: '100vh', backgroundSize: 'cover', paddingTop: '10px' }}>
                <Box sx={{ display: 'flex ', width: '100%' }}>
                    <Grid container sx={{ width: '100%' }}>
                        <Grid size={7} sx={{ alignContent: 'center' }}>
                            <Typography sx={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', color: '#cd3665' }}>
                                Cùng nhau tìm hiểu các chiến dịch tình nguyện <br /> tham gia cùng chúng tớ nhé!
                            </Typography>
                            <Typography sx={{ textAlign: 'center', marginTop: '2%' }}>
                                Chúng tớ tin rằng một sinh viên là tương lai tương sáng của đất nước, <br />
                                vì thế giúp đỡ các bạn sinh viên gặp hoàn cảnh khó khăn là điều đáng tự hào. <br />
                                Điều kỳ diệu có thể được tạo nào nên từ bất kỳ ai, sinh viên SGU, tớ và cả bạn nữa!
                            </Typography>
                        </Grid>
                        <Grid size={1} sx={{ alignContent: 'center' }}>
                            <VerticalCurve />
                        </Grid>
                        <Grid size={3} sx={{ alignContent: 'center' }}>
                            <Box>
                                <Button
                                    sx={{ color: '#cd3665', width: '200px', fontSize: '24px' }}
                                    variant="outlined"
                                    color="neutral"

                                // onClick={() => handleClickOpen()}
                                >
                                    QUYÊN GÓP
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box >
            </Grid >
            <Box sx={{ display: 'grid', justifyContent: 'center', marginTop: '5%' }}>
                <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                    Bạn muốn đề xuất một hoàn cảnh khó khăn, cần giúp đỡ? <br />
                    Đừng ngần ngại, hãy điền vào form dưới đây để thầy, cô hỗ trợ bạn nhé!
                </Typography>
                <Box sx={{ display: 'grid', justifyContent: 'center', marginTop: '5%' }}>
                    <Button
                        sx={{ color: '#cd3665', width: '200px', fontSize: '24px' }}
                        variant="outlined"
                        color="neutral"

                        onClick={handleNavigation}
                    >
                        GÂY QUỸ
                    </Button>
                </Box>
            </Box>
            <HomeIntroduce />
            <Footer />
        </>
    )
}

const VerticalCurve = () => {
    return (
        <hr
            style={{
                borderStyle: 'solid',
                width: '3px', // Độ rộng đường cong
                height: '450px', // Chiều cao
                backgroundColor: '#ff3841', // Màu của đường cong
                borderRadius: '50px', // Tạo đường cong

            }}
        ></hr>

    );
};