import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMovie } from "../../interfaces";
import { getMovies } from "../../actions/MovieActions";

const MoviesTable = () => {

  const [movies, setMovies] = useState<IMovie[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await getMovies();
      setMovies(allMovies);
    }
    getAllMovies();
  }, [])

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID' , flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'name', headerName: 'Name', flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'publishDate', headerName: 'Publish Date', flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'viewsCount', headerName: 'Number Of Views', flex: 1,
    align: "center",
    headerAlign: "center"}
  ];

  const rows: GridRowsProp = movies.map((movie) => {
    return { id: movie.id, name: movie.name, publishDate: movie.publishDate, viewsCount: movie.viewsCount}
  })

  return (
    <>
      <Box mb={4} sx={{display: "flex", justifyContent: "space-between", maxWidth: "100%"}}>
      <Typography
        sx={{
          fontWeight: "bold",
        }}
        variant="h5"
      >
        Movies
      </Typography>

      <Button onClick={() => {navigate('/dashboard/add-movie')}} sx={{backgroundColor: "background.paper", color:" White", padding: 2}}>Add Movie</Button>

     </Box>
     <Box sx={{ height: 650, mx: "auto"}}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </>
  )

}

export default MoviesTable