import { ReactNode, useContext, useEffect, useState } from "react"
import WatchListContext from "../contexts/WatchListContext"
import { IMovie } from "../interfaces";
import AuthContext from "../contexts/authContext";
import { getUserWatchlist, toggleWatchlistMovie } from "../actions/UserActions";

interface IProp {
  children: ReactNode
}

const WatchListProvider = ({children}: IProp) => {

  const {user} = useContext(AuthContext);

  const [watchList, setWatchList] = useState<IMovie[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    const getAllMovies = async () => {
      try{
        const returnedMovies = await getUserWatchlist(user.uid);
        setWatchList(returnedMovies);
      }
      catch(error){
        if(error instanceof Error){
          setError(error.message);
        }
      }
      finally{
        setLoading(false);
      }
    };
    setLoading(true)
    getAllMovies();
  }, [user]);


  const handleToggleMyListMovies = async (movieId: string) => {
    setLoading(true)
    try{
      await toggleWatchlistMovie(user.uid, movieId);
      const returnedMovies = await getUserWatchlist(user.uid);
      setWatchList(returnedMovies);
    }
    catch(error){
       if(error instanceof Error){
        setError(error.message);
       }
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
    <WatchListContext.Provider value={{watchList, handleToggleMyListMovies, loading, error}}>
        {children}
    </WatchListContext.Provider> 
    </>
  )
}

export default WatchListProvider