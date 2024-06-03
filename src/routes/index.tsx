import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import GenresTable from "../pages/dashboard/GenresTable";
import MoviesTable from "../pages/dashboard/MoviesTable";
import ReportsTable from "../pages/dashboard/ReportsTable";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedAdminRoutes from "../components/ProtectedAdminRoutes";
import AddGenre from "../pages/dashboard/AddGenre";
import AddMovie from "../pages/dashboard/AddMovie";
import Home from "../pages/Home";
import AllGenres from "../pages/AllGenres";
import Movie from "../pages/Movie";
import UserLayout from "../Layouts/UserLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import MyList from "../pages/MyList";
import MoviesByGenre from "../pages/MoviesByGenre";
import NotFoundPage from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import UsersTable from "../pages/dashboard/UsersTable";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>

      <Route path="/" element={<ProtectedRoute> <UserLayout /> </ProtectedRoute>} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="/genres" element={<AllGenres />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/genres/:genre/movies" element={<MoviesByGenre />} />

          <Route path="/dashboard" element={<ProtectedAdminRoutes> <DashboardLayout /> </ProtectedAdminRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path="genres" element={<GenresTable />} />
            <Route path="add-genre" element={<AddGenre />} />
            <Route path="movies" element={<MoviesTable />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="reports" element={<ReportsTable />} />
          </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}/>
    </>
  )
);

export default router;
