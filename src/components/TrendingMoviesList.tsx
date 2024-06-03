import { useState } from 'react';
import { Box, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MovieTrendCard from './MovieTrendCard';
import { IMovie } from '../interfaces';

interface IProp {
  movies: IMovie[];
}

const TrendingMoviesList = ({ movies }: IProp) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  let itemsToShow = 0;
  if (isXs) {
    itemsToShow = 1;
  } else if (isSm) {
    itemsToShow = 2;
  } else if (isMd) {
    itemsToShow = 3;
  } else if (isLg) {
    itemsToShow = 4;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < movies.length - itemsToShow ? prev + 1 : movies.length - itemsToShow
    );
  };

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {currentIndex > 0 && (
        <IconButton
          onClick={handlePrev}
          sx={{
            height: "100%",
            position: 'absolute',
            left: 0,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            borderRadius: 0
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}
      <Box sx={{ overflow: 'hidden', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {movies.map((movie) => (
            <Grid item key={movie.id} sx={{ flex: '0 0 auto', width: `${100 / itemsToShow}%`, paddingX:1}}>
              <MovieTrendCard movie={movie} />
            </Grid>
          ))}
        </Box>
      </Box>
      {currentIndex < movies.length - itemsToShow && (
        <IconButton
          onClick={handleNext}
          sx={{
            height: "100%",
            position: 'absolute',
            right: 0,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            borderRadius: 0
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default TrendingMoviesList;