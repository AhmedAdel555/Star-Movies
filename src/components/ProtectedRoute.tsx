import { ReactNode, useContext } from "react"
import AuthContext from "../contexts/authContext"
import { Navigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

interface IProp {
  children: ReactNode
}

const ProtectedRoute = ({children}: IProp) => {
  const {user, loading, error} = useContext(AuthContext);
  
  if(loading){
    return <CircularProgress />
  }
  if(error){
    throw new Error(error);
  }
  if(!user.uid) return <Navigate to={'/signin'} replace/>;
  return children ;
}

export default ProtectedRoute