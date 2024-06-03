import { Box } from "@mui/material";
import MovieList from "../components/MovieList";
import { useContext } from "react";
import WatchListContext from "../contexts/WatchListContext";

const MyList = () => {
  const { watchList, error } = useContext(WatchListContext);

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      {watchList.length > 0 ? (
        <Box py={15} px={4}>
          <MovieList movies={watchList} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full viewport height
          }}
        >
          <Box>No items in the list.</Box>
        </Box>
      )}
    </>
  );
};

export default MyList;
