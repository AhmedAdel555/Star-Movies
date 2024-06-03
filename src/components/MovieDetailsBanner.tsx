import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IMovie, IUser } from "../interfaces";
import { useEffect, useState } from "react";
import { toggleDislikeFilm, toggleLikeFilm} from "../actions/MovieActions";
import StarRateIcon from '@mui/icons-material/StarRate';

interface IProp {
  movieDatiels: IMovie;
  userDetails: IUser;
  handleValidateMovie: () => void;
  handleValidateUser: () => void;
}

export const MovieDetailsBanner = ({movieDatiels, userDetails, handleValidateMovie, handleValidateUser}: IProp) => {

  const [error, setError] = useState('');

  const [Liked, setLiked] = useState(false);

  const [disLiked, setDisLiked] = useState(false)

  const [numberOfLikes, setNumberOfLikes] = useState(0);

  const [numberOfDisLikes, setNumberOfDisLiked] = useState(0)

  useEffect(() => {
    setLiked(userDetails.likedFilms.includes(movieDatiels.id))
    setDisLiked(userDetails.dislikedFilms.includes(movieDatiels.id));
    setNumberOfLikes(movieDatiels.likesCount);
    setNumberOfDisLiked(movieDatiels.dislikesCount);
  }, [])

  const handleToggleLike = async () => {
    setLiked((prev) => prev ? false: true);
    !Liked ? setNumberOfLikes((prev) => prev + 1) : setNumberOfLikes((prev) => prev - 1) 
    if(disLiked){
      setDisLiked((prev) => prev ? false: true)
      setNumberOfDisLiked((prev) => prev - 1);
    }
    try{
      await toggleLikeFilm(userDetails.id , movieDatiels.id);
      handleValidateMovie();
      handleValidateUser();
    }
    catch(error){
      if(error instanceof Error){
        setError(error.message);
      }
    }
  }

  const handleToggleDisLike = async () => {
    setDisLiked((prev) => prev ? false: true);
    !disLiked ? setNumberOfDisLiked((prev) => prev + 1) : setNumberOfDisLiked((prev) => prev - 1) 
    if(Liked){
      setLiked((prev) => prev ? false: true);
      setNumberOfLikes((prev) => prev - 1);
    }
    try{
      await toggleDislikeFilm(userDetails.id , movieDatiels.id);
      handleValidateMovie();
      handleValidateUser();
    }
    catch(error){
      if(error instanceof Error){
        setError(error.message);
      }
    }
  }
  

  if(error){
    throw new Error(error)
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: "auto",
          backgroundColor: "transparent",
          boxShadow: "none",
          paddingBottom: 5
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: "40%" },
            height: 500,
            marginRight: { sm: 2 },
            borderRadius: 5,
          }}
          image={movieDatiels.thumbnail}
          alt="Movie cover"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Align content vertically
            flex: "1",
          }}
        >
            <Typography variant="h3" sx={{ mb: 1 }}>
              {movieDatiels.name}
            </Typography>
            <Typography variant="body1" fontSize={26} color="text.secondary" sx={{ mb: 1 }}>
              {movieDatiels.genre}
            </Typography>
            
            <Typography variant="body1" fontSize={26} color="text.secondary" sx={{ mb: 1 }}>
              Rate: {movieDatiels.rate === 0 ? "0" : `${(movieDatiels.rate * 10 / movieDatiels.numberOfRates).toFixed(1)}`}  / 10<StarRateIcon sx={{color:"#FFD700"}}/>
            </Typography>
            
            <Typography overflow={"hidden"} variant="body2" fontSize={20} color="text.secondary" sx={{ mb: 2 }}>
               {movieDatiels.description}
            </Typography>
            <Typography variant="body2" fontSize={20} color="text.secondary" sx={{ mb: 1 }}>
              <strong>Publish Date:</strong> {movieDatiels.publishDate.toLocaleDateString()}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <IconButton aria-label="like" sx={{ color: "green" }} onClick= { async () => {
                 await handleToggleLike()
              }}>
                <ThumbUpIcon sx={{color: Liked ? "green" : "text.primary"}}/>
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                 {numberOfLikes}
              </Typography>
              <IconButton aria-label="dislike" sx={{ color: "red", ml: 2 }} onClick={ async () => {
                  await handleToggleDisLike();
              }}>
                <ThumbDownIcon sx={{color: disLiked ? "red" : "text.primary"}}/>
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {numberOfDisLikes}
              </Typography>
              <IconButton aria-label="views" sx={{ ml: 2 , pointerEvents: 'none'}}>
                <VisibilityIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {movieDatiels.viewsCount}
              </Typography>
            </Box>
        </CardContent>
      </Card>
      {/* Video section */}
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          height: "auto",
          backgroundColor: "transparent",
          boxShadow: "none",
          paddingBottom: 5
        }}
      >
          <CardMedia
            component="video"
            controls
            sx={{
              width: "100%",
              aspectRatio: "16/9", // Set aspect ratio for the video
              borderRadius: 2,
            }}
            src={movieDatiels.videoUrl}
          />
      </Card>
    </>
  );
}

export default MovieDetailsBanner;