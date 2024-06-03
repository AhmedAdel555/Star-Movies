import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { IMovie } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

const FullScreenSection = styled(Box)<{ backgroundImage: string }>(({ backgroundImage }) => ({
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '100vh',
  width: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: '#fff',
  boxSizing: 'border-box',
  paddingLeft: '2%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },
}));

const OverlayText = styled(Box)(({ theme }) => ({
  maxWidth: '40%', // adjust the width of the text container as needed
  zIndex: 2, // text above the overlay
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    maxWidth: '60%', // adjust for medium screens
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '80%', // adjust for small screens
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%', // full width on extra small screens
    padding: theme.spacing(2), // add padding for better readability
    textAlign: 'center', // center align text on extra small screens
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 3),
  fontSize: '1.5rem',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: '#161d2f',
  },
  zIndex: 2, // ensure the button is above the overlay
}));

interface IProp {
  topMovie: IMovie
}

const HeroSection = ({ topMovie }: IProp) => {
  const navigate = useNavigate();

  return (
    <FullScreenSection backgroundImage={topMovie.thumbnail}>
      <OverlayText>
        <Typography variant="h6" sx={{color: "#FFD700	"}}>
          Top 1  <WorkspacePremiumOutlinedIcon sx={{color: "#FFD700"}} />
        </Typography>
        <Typography variant="h2" component="h1">
          {topMovie.name}
        </Typography>
        <Typography variant="h5" component="p" sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'}}>
          {topMovie.description}
        </Typography>
      </OverlayText>
      <StyledButton onClick={() => {
        navigate(`movie/${topMovie.id}`)
      }}>
        <PlayCircleIcon sx={{marginRight: "10px"}} /> Watch Now
      </StyledButton>
    </FullScreenSection>
  );
}

export default HeroSection;
