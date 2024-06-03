import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import { IMovie } from '../interfaces';
import { useState, useEffect } from 'react';
import { search } from '../actions/MovieActions';
import { Box } from '@mui/material';
import MovieList from './MovieList';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProp {
  open: boolean;
  handleClose: () => void;
}

const FullScreenDialog: React.FC<IProp> = ({ open, handleClose }) => {
  const [searchName, setSearchName] = useState('');
  const [films, setFilms] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await search(searchName.toLowerCase());
        setFilms(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchName]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} sx={{background: "background.paper"}}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <TextField
            color='primary'
            fullWidth
            variant="standard"
            size="small"
            label="Search"
            value={searchName}
            onChange={handleSearchChange}
          />
        </Toolbar>
      </AppBar>
      <Box py={10} px={4}>
           <MovieList movies={films} />
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;
