import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { IGenre } from "../interfaces";
import { getAllGenres } from "../actions/GenreActions";
import MoviesSkelton from "../components/MoviesSkelton";
import { Link as RouterLink } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  textAlign: "center",
  ...theme.typography.h4,
  height: 180,
  color: 'inherit',
  '&:hover': {
    color: "#5aa17f"
  }
}));

const AllGenres = () => {

  const [genres, setGeneres] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
     const getGenres = async () => {
        try{
          const allGeneres = await getAllGenres();
          setGeneres(allGeneres);
        }catch(error){
          if(error instanceof Error){
            setError(error.message);
          }
        }
        finally{
          setLoading(false)
        }
     }
     getGenres();
  }, [])

  if(loading){
    return < MoviesSkelton />
  }

  if(error){
    setError('');
    throw new Error(error);
  }

  return (
    <>
      <Box py={12} px={4}>
      <Grid container spacing={3}>
        {genres.map((genre, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Link component={RouterLink} to={`/genres/${genre.name}/movies`} underline="none">
              <Item elevation={3} sx={{fontSize:"42px"}}>
                {genre.name}
              </Item>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
    
  );
};

export default AllGenres;
