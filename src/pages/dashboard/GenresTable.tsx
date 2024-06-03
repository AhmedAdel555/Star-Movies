import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IGenre } from "../../interfaces";
import { getAllGenres } from "../../actions/GenreActions";

const GenresTable = () => {

  const [genres, setGenres] = useState<IGenre[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      const allGenres = await getAllGenres();
      setGenres(allGenres);
    }
    getGenres();

  }, [])

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID' , flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'name', headerName: 'Name', flex: 1,
    align: "center",
    headerAlign: "center",},
  ];

  const rows: GridRowsProp = genres.map((genre) => {
    return { id: genre.id, name: genre.name}
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
        Genres
      </Typography>

      <Button onClick={() => {navigate('/dashboard/add-genre')}} sx={{backgroundColor: "background.paper", color:" White", padding: 2}}>Add Genre</Button>

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

export default GenresTable