import { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { IMovie } from "../interfaces";
import { useContext } from "react";
import WatchListContext from "../contexts/WatchListContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useNavigate } from "react-router-dom";


interface IProp {
  movie: IMovie;
}

const MovieTrendCard = ({ movie }: IProp) => {

  const navigate = useNavigate();


  const [isHovered, setIsHovered] = useState(false);

  const { watchList, handleToggleMyListMovies, loading, error } =
    useContext(WatchListContext);

  if (error) {
    throw new Error(error);
  }

  return (
      <Card
        key={movie.id}
        elevation={0}
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "100%",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent
          style={{
            padding: 0,
            position: "relative",
            boxShadow: "none",
            height: "180px",
          }}
        >
          <img
            src={movie.thumbnail}
            alt=""
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgcolor="rgba(0, 0, 0, 0.7)"
            borderRadius="8px"
            style={{
              visibility: isHovered ? "visible" : "hidden",
              transition: "visibility 0.2s ease",
            }}
          />
          <Stack
            mt="6"
            spacing={0}
            position="absolute"
            top={5}
            left={0}
            right={0}
            p={4}
            sx={{
              visibility: isHovered ? "visible" : "hidden",
              transition: "visibility 0.2s ease",
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography fontSize={16} aria-label="year of movie">
                  {movie.publishDate.toDateString().split(" ")[3]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography fontSize={16} aria-label="movie category">
                  {movie.genre}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: "1rem",
                    height: "1rem",
                    bg: "#E0E0E0",
                    borderRadius: "full",
                  }}
                />
              </Grid>
            </Grid>
            <Typography aria-label="movie rating" padding={0}>
              {movie.name}
            </Typography>
          </Stack>
          <Box
            style={{
              position: "absolute",
              left: 0,
              bottom: 5,
              display: "flex",
              justifyContent: "center",
              padding: "5px",
              visibility: isHovered ? "visible" : "hidden",
              transition: "visibility 0.2s ease",
            }}
          >
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                p: "1rem",
                cursor: "pointer",
              }}>
              <Button sx={{color: "text.primary"}} onClick={() => {
                navigate(`movie/${movie.id}`)
              }}>
                <PlayCircleIcon sx={{marginRight: "10px"}} /> Watch Now
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: "1rem",
                cursor: "pointer",
              }}
              onClick={() => handleToggleMyListMovies(movie.id)}
            >
              {loading ? (
                <CircularProgress />
              ) : watchList.some((item) => item.id === movie.id) ? (
                <>
                  <RemoveCircleOutlineIcon /> "My List"
                </>
              ) : (
                <>
                  {" "}
                  <AddCircleOutlineIcon /> My List
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default MovieTrendCard;
