import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useState } from "react";
import { IMovie } from "../interfaces";
import { Link } from "react-router-dom";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import WatchListContext from "../contexts/WatchListContext";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {

  const {watchList, handleToggleMyListMovies, loading, error} = useContext(WatchListContext);

  const [hover, setHover] = useState(false);

  if(error){
    throw new Error(error);
  }

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundColor: "transparent", // Set background color to transparent
        width: "100%",
        transition: "transform 0.2s ease-in-out", // Add a smooth transition
        "&:hover": {
          width: "100%",
          position: 'absolute',
          top: '0px',
          transform: "scale(1.1)", // Adjust the scale factor as desired
          zIndex: 1, // Set z-index to 1 on hover to bring to front
          backgroundColor: "background.paper", // Set background color to transparent
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
         <img src={movie.thumbnail} alt="" style={{ width: "100%", height: "180px", borderRadius: "8px" }} />
      </Link>      
      <CardContent sx={{ 
        pt: 0,
        pb: 0,
        opacity: hover ? 1 : 0,
      }}>
        <Typography gutterBottom variant="h5" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {movie.genre}
        </Typography>
      </CardContent>
      <CardActions sx={{ 
        pt: 0,
        pb: 0,
        opacity: hover ? 1 : 0,
        display: "flex",
        justifyContent: "space-between"
       }}>
          <Button size="small" sx={{color: 'text.primary'}} onClick={async () => {
                 await handleToggleMyListMovies(movie.id)
          }}> {loading ? <CircularProgress /> : watchList.some((item) => item.id === movie.id ) ? <RemoveCircleOutlineIcon/> : <AddCircleOutlineIcon/> }  My List
          </Button>
          <Box sx={{display: "flex", alignItems: "center", mr: 5}}>
              <IconButton aria-label="views" sx={{ ml: 2 , pointerEvents: 'none'}}>
                <VisibilityIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {movie.viewsCount}
              </Typography>
          </Box>
              
      </CardActions>
    </Card>
  );
};

export default MovieCard;
