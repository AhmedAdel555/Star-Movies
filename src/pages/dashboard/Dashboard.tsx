import { Stack } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import ReportIcon from "@mui/icons-material/Report";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from '@mui/icons-material/Person';
import DashboardCard from "../../components/DashboardCard";
import Charts from "../../components/Charts";
import { useEffect, useState } from "react";
import { getMovies, GetMoviesCountGroupByGenre } from "../../actions/MovieActions";
import { IMovie } from "../../interfaces";
import { getAllGenres } from "../../actions/GenreActions";
import { getAllUsers } from "../../actions/UserActions";
import { getAllReports } from "../../actions/ReportsActions";



const Dashboard = () => {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesGroupByGenre, setMoviesGroupByGenre] = useState<{id: number, value: number, label: string}[]>([]);
  const [genresCount, setGenresCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    const getDashboardData = async () => {
       const allMovies = await getMovies();
       setMovies(allMovies);
       setMoviesCount(allMovies.length);
       const allGenres = await getAllGenres();
       setGenresCount(allGenres.length);
       const allUsers = await getAllUsers();
       setUsersCount(allUsers.length);
       const allReports = await getAllReports();
       setReportsCount(allReports.length);
       const moviesCountGroupByGenre = await GetMoviesCountGroupByGenre()
       setMoviesGroupByGenre(moviesCountGroupByGenre)       
    }
     getDashboardData();
  }, [])

  return (
    <>
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
      alignItems={"center"}
    >
      <DashboardCard
        icon={<CategoryIcon sx={{ fontSize: "32px"}} />}
        title={"Genres"}
        count={genresCount}/>

      <DashboardCard
        icon={<MovieIcon sx={{ fontSize: "32px"}}/>}
        title={"Movies"}
        count={moviesCount}
      />

     <DashboardCard
        icon={<PersonIcon sx={{ fontSize: "32px"}}/>}
        title={"Users"}
        count={usersCount}
      />

        <DashboardCard
        icon={<ReportIcon sx={{ fontSize: "32px"}}/>}
        title={"Reports"}
        count={reportsCount}
      />
    </Stack>
    <Charts barChartData={movies.map((m) => {return {movie: m.name, views: m.viewsCount}})} piChartData={moviesGroupByGenre} />
    </>
    
  );
}

export default Dashboard