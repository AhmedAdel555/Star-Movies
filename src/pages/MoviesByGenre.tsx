import { useEffect, useState } from "react";
import { IMovie } from "../interfaces";
import MoviesSkelton from "../components/MoviesSkelton";
import MovieList from "../components/MovieList";
import { Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { getMoviesFilteredByGenre } from "../actions/MovieActions";
import { moviesPerPage } from "./Home";

const MoviesByGenre = () => {
  
  const [genreMovies, setGenreMovies] = useState<IMovie[]>([]);

  const {genre} = useParams<string>();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if(!genre){
      setLoading(false);
      setError("Genre not found");
      return;
    }
    const getAllMovies = async () => {
      try{
        const returnedMovies = await getMoviesFilteredByGenre(genre);
        setGenreMovies(returnedMovies);
      }catch(error){
        if(error instanceof Error){
           setError(error.message);
        }
      }
      finally{
        setLoading(false);
      }
    };
    getAllMovies();
  }, [genre]);

  if (loading) {
    return <MoviesSkelton />;
  }

  if(error){
    throw new Error(error);
  }

  return (
    <Box py={15} px={4}>
        <MovieList movies={genreMovies.slice((page - 1) * moviesPerPage, page * moviesPerPage)} />
        {genreMovies.length > moviesPerPage && <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "10px",
          }}
        >
          <Pagination
            count={Math.ceil(genreMovies.length / moviesPerPage)}
            page={page}
            onChange={handleChange}
            color={"primary"}
          />
        </Box>}
    </Box>
  );
}

export default MoviesByGenre