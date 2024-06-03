import { ReactNode, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../actions/UserActions";
import { IUser } from "../interfaces";
import { CircularProgress } from "@mui/material";


interface IProp {
  children: ReactNode
}

const ProtectedAdminRoutes = ({children}: IProp) => {
  const {user} = useContext(AuthContext)
  const [userDetails, setUserDetails] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserDetails = async () => {
      try{
        const userDetails = await fetchCurrentUser(user.uid);
        setUserDetails(userDetails);
      }catch(error){
        if(error instanceof Error){
           setError(error.message);
        }
      }
      finally{
        setLoading(false);
      }
    }
    getUserDetails();
  }, [user])

  if(loading){
    return <CircularProgress />
  }

  if(error){
    setError('');
    throw new Error(error);
  }

  if(!userDetails.isAdmin) return <Navigate to={'/signin'} replace/>;
  return children ;
}

export default ProtectedAdminRoutes