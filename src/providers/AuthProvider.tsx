import { ReactNode, useEffect, useState } from 'react'
import AuthContext from '../contexts/authContext'
import { auth } from '../firebase'
import { User } from 'firebase/auth'

interface IProp {
  children: ReactNode
}

const AuthProvider = ({children}: IProp) => {

  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (data) => {
      setLoading(true);
      if (data) {
        try{
          setUser(data)
        }
        catch(error){
          if(error instanceof Error){
            setError(error.message);
          }
        }
        finally{
          setLoading(false);
        }
      }else{
        setUser({} as User)
        setLoading(false);
      }
    })
    return () => unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={{user, loading, error}}>
        {children}
    </AuthContext.Provider> 
  )
}

export default AuthProvider