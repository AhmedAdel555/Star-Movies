import { Outlet } from "react-router-dom";
import UserAppBar from "../components/UserAppBar";
import WatchListProvider from "../providers/WatchListProvider";

const UserLayout = () => {
  return (
    <>
      <WatchListProvider>
        <UserAppBar />
        <Outlet />
      </WatchListProvider>
    </>
  );
};

export default UserLayout;
