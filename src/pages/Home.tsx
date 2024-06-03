import { Box, Pagination, Typography } from "@mui/material";
import HeroSection from "../components/heroSection";
import MovieList from "../components/MovieList";
import { useEffect, useState } from "react";
import { IMovie } from "../interfaces";
import { getMovies } from "../actions/MovieActions";
import MoviesSkelton from "../components/MoviesSkelton";
import TrendingMoviesList from "../components/TrendingMoviesList";

export const moviesPerPage: number = 4;

const Home = () => {
  const [allMovies, setAllMovies] = useState<IMovie[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const returnedMovies = await getMovies();
        setAllMovies(returnedMovies);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getAllMovies();
  }, []);

  if (loading) {
    return <MoviesSkelton />;
  }

  if (error) {
    setError("");
    throw new Error();
  }

  return (
    <>
      {allMovies.length > 0 ? (
        <>
          <HeroSection topMovie={allMovies[0]} />
          <Box py={2} px={4}>
            <Box width={"100%"}>
              <Typography variant="h4" component="h1" my={6} fontWeight={400}>
                Top 10 Trending
              </Typography>
              <TrendingMoviesList movies={allMovies.slice(0, 10)} />
          </Box>
            <Box width={"100%"}>
              <Typography variant="h4" component="h1" my={6} fontWeight={400}>
                Recommended For You
              </Typography>
              <MovieList
                movies={allMovies.slice(
                  (page - 1) * moviesPerPage,
                  page * moviesPerPage
                )}
              />
              {allMovies.length > moviesPerPage && (
                <Box
                  sx={{
                    position: "relative",
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: "10px",
                  }}
                >
                  <Pagination
                    count={Math.ceil(allMovies.length / moviesPerPage)}
                    page={page}
                    onChange={handleChange}
                    color={"primary"}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <Box width={"100%"}>
          <Typography variant="h4" component="h1" my={6} fontWeight={400}>
            No Movies Found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
