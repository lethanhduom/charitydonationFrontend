import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../../../Service/localStorageService"; 
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `http://localhost:8081/api/account/google/authenticate?code=${authCode}`,
        {
          method: "POST",
        }

        
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          // setToken(data.result?.token);
          setToken(data.token)
          localStorage.removeItem("userToken");
          setIsLoggedin(true);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
}
