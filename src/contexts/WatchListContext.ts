import React from "react";
import { IMovie } from "../interfaces";

interface WatchListContextType {
  watchList: IMovie[];
  handleToggleMyListMovies:  (movieId: string) => Promise<void>
  loading: boolean;
  error: string;
}

const WatchListContext = React.createContext<WatchListContextType>({} as WatchListContextType)

export default WatchListContext;