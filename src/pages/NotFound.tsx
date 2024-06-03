import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: "primary",
      }}
    >
      <img src={'/404.png'} alt="Page not found" style={{ width: '300px', height: 'auto' }} />

      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" sx={{mt: 4, backgroundColor: 'background.paper'}} onClick={() => {
        navigate('/');
      }}>Back Home</Button>
    </Box>
  );
}

export default NotFoundPage;
