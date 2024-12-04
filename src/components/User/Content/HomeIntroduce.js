import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import transferMoneyImg from '../Images/tranfer_money.png'
import charityImg from '../Images/charity_home.jpg'
import cellPhoneImg from '../Images/cellphone.png'
import handShakeImg from '../Images/handshake.jpg'
import coinImg from '../Images/coin.png'
export default function HomeIntroduce() {
    return (
        <Box
            sx={{ marginTop: '5%', borderTopStyle: 'solid', borderRadius: '15%', paddingTop: '5%', borderColor: '#ffdfdf' }}
        >
            <Typography sx={{ ml: 2, flex: 1, textAlign: 'center', color: '#d63f8c', fontSize: '30px', fontWeight: 'bold' }} variant="h6" component="div">
                Gây quỹ nhân ái - Chắp cánh tương lai
            </Typography>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid size={4} sx={{ paddingLeft: '10%', alignContent: 'center', }}>
                    <Grid container sx={{ marginBottom: '5%' }}>
                        <Grid size={3}>
                            <img src={transferMoneyImg} style={{ width: '80%' }} alt="transferMoney"></img>
                        </Grid>
                        <Grid size={9} sx={{ alignContent: 'center', color: '#d63f8c' }}>
                            <Typography>Quyên góp nhanh chóng, dễ dàng</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid size={3}>
                            <img src={cellPhoneImg} style={{ width: '80%' }} alt="cellPhone"></img>
                        </Grid>
                        <Grid size={9} sx={{ alignContent: 'center', color: '#d63f8c' }}>
                            <Typography>Minh bạch, công khai mọi đóng góp</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    size={3}
                >
                    <img src={charityImg} style={{ width: '80%' }} alt="charityImg"></img>

                </Grid>
                <Grid size={4} sx={{ paddingLeft: '5%', alignContent: 'center' }}>
                    <Grid container sx={{ marginBottom: '5%' }}>
                        <Grid size={3}>
                            <img src={handShakeImg} style={{ width: '80%' }} alt="handShake"></img>
                        </Grid>
                        <Grid size={9} sx={{ alignContent: 'center', color: '#d63f8c' }}>
                            <Typography>Đối tác của các cơ quan, tổ chức uy tín</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid size={3}>
                            <img src={coinImg} style={{ width: '80%' }} alt="coinImg"></img>
                        </Grid>
                        <Grid size={9} sx={{ alignContent: 'center', color: '#d63f8c' }}>
                            <Typography>1000đ cũng là đáng quý</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
