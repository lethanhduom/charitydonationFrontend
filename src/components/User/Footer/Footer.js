import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Grid from '@mui/material/Grid2';
import logoImg from '../Images/logo_user_page.png'
const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "#162542", color: "#fff", padding: "40px 0" }}>
            <Grid container spacing={2} justifyContent="center">
                {/* Logo và thông tin sứ mệnh */}
                <Grid item xs={12} md={6}>
                    <Box textAlign="center" mb={3}>
                        <img
                            src={logoImg}
                            alt="Logo"
                            style={{ width: "80px", marginBottom: "10px" }}
                        />
                        <Typography variant="h6" component="div" fontWeight="bold">
                            NÂNG BƯỚC TƯƠNG LAI
                        </Typography>
                        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                            SINH VIÊN TRƯỜNG ĐẠI HỌC SÀI GÒN
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 2, maxWidth: 300, lineHeight: 1.5 }}>
                            Thắp sáng bởi ngọn lửa của tình thương vô điều kiện, Nền tảng quyên góp từ thiện
                            trường Đại học Sài Gòn ấp ủ khát vọng cùng sứ mệnh mang tới sự hỗ trợ tốt nhất cho các bạn sinh
                            viên của trường.
                        </Typography>
                    </Box>

                    {/* Social Media Links */}
                    <Box textAlign="center">
                        <Link href="#" sx={{ margin: "0 10px", color: "#fff" }}>
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link href="#" sx={{ margin: "0 10px", color: "#fff" }}>
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link href="#" sx={{ margin: "0 10px", color: "#fff" }}>
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </Box>
                </Grid>

                {/* Thông tin liên hệ */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            color: "#162542",
                            borderRadius: "10px",
                            padding: "20px",
                            textAlign: "left",
                            maxWidth: 400,
                            margin: "auto",
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Thông Tin Liên Hệ
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            <i className="fas fa-phone-alt" style={{ marginRight: 10 }}></i>
                            <Link href="tel:0903035030" sx={{ color: "#162542", fontWeight: "bold" }}>
                                0123456789
                            </Link>
                        </Typography>
                        <Typography variant="body1">
                            <i className="fas fa-envelope" style={{ marginRight: 10 }}></i>
                            <Link href="mailto:hope@children-of-vietnam.org" sx={{ color: "#162542" }}>
                                sgu@edu.vn
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 2, lineHeight: 1.8 }}>
                            Quỹ Nâng Bước Tương Lai SGU | 273 An Dương Vương, Phường 3, Quận 5  | Việt Nam
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, lineHeight: 1.8 }}>
                            Góp một bàn tay cho nhiều cuộc đời nhỏ
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold", marginTop: 1 }}>
                            Đồng hành cùng Quỹ Nâng Bước Tương Lai để ươm mầm hạnh phúc cho các sinh viên
                            kém may mắn nhé các bạn!
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
