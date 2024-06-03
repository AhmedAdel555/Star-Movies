import { Grid} from "@mui/material";
import MovieCard from "./MovieCard";
import { IMovie } from "../interfaces";

interface IProp {
  movies: IMovie[];
}

const MovieList = ({movies}: IProp) => {

  return (
    <>
        <Grid container columnSpacing={2} rowSpacing={0}>
          {movies.map((item) => (
            <Grid
              height={"100%"}
              item
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ position: "relative", backgroundColor: "transparent" }}
            >
              <MovieCard movie={item} />
            </Grid>
          ))}
        </Grid>
    </>
  );
};

export default MovieList;
