import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMovieComment, getMovieById, getMovieComments, toggleViewToFilm } from "../actions/MovieActions";
import MovieSkelton from "../components/MovieSkelton";
import { IComment, IMovie, IUser } from "../interfaces";
import MovieDetailsBanner from "../components/MovieDetailsBanner";
import AuthContext from "../contexts/authContext";
import { fetchCurrentUser } from "../actions/UserActions";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Comment from "../components/Comment";

interface AddComment {
  commentText: string
}


const MovieComponent = () => {
  const {user} = useContext(AuthContext);
  const { id } = useParams();

  // movies states
  const [movie, setMovie] = useState<IMovie>({} as IMovie);
  const [validateMovie, setValidateMovie] = useState(0);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [errorMovie, setErrorMovie] = useState('');
  
  // user state
  const [userDetails, setUserDetails] = useState<IUser>({} as IUser);
  const [validateUserDetails, setValidateUserDetails] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState('');

  // comments
  const [comments, setComments] = useState<IComment[]>([]);
  const [validateComments, setValidateComments] = useState(0);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState('');  

  const {register, reset, handleSubmit, formState: { errors, isSubmitting } 
  } = useForm<AddComment>({
    defaultValues: {
      commentText: ''
    }
  })


  const onSubmitAddComment: SubmitHandler<AddComment> = async (data) => {
    try{
      await addMovieComment(movie.id, user.uid, userDetails.username, data.commentText);
      setValidateComments((prev) => prev + 1);
      setValidateMovie((prev) => prev + 1);
    }catch(error){
      if(error instanceof Error){
        toast.error(
          "error when adding comment.",
          {
            duration: 4000,
            position: "top-center",
          }
        );
       }
    }finally{
      reset();
    }
  };

  useEffect(() => {
    if (!id) {
      setLoadingMovie(false);
      setLoadingUser(false);
      setErrorMovie("id not found");
      return;
    }
    const addView = async () => {
      try{
        await toggleViewToFilm(user.uid, id);
      }catch(error){
        console.log("error in add view");
      }
    }
    addView();
  }, [id, user])

  useEffect(() => {
    if (!id) {
      setLoadingMovie(false);
      setLoadingUser(false);
      setErrorMovie("id not found");
      return;
    }
    const getMovie = async () => {
      try{
        const returnedMovie = await getMovieById(id);
        setMovie(returnedMovie);
      }catch(error){
         if(error instanceof Error){
          setErrorMovie(error.message);
         }
      }
      finally{
        setLoadingMovie(false);
      }
    };
    getMovie();
  }, [id, user, validateMovie]);

  useEffect(() => {
    const getUserDetails = async () => {
      try{
        const userDetails = await fetchCurrentUser(user.uid);
        setUserDetails(userDetails);
      }catch(error){
        if(error instanceof Error){
          setErrorUser(error.message);
        }
      }
      finally{
        setLoadingUser(false);
      }
    }
    getUserDetails();
  }, [user, validateUserDetails])


  useEffect(() => {
    if (!id) {
      setLoadingMovie(false);
      setLoadingUser(false);
      setErrorMovie("id not found");
      return;
    }
    const getComments = async () => {
      try{
        const MovieComments = await getMovieComments(id);
        setComments(MovieComments);
      }catch(error){
        if(error instanceof Error){
          setErrorComments(error.message);
        }
      }
      finally{
        setLoadingComments(false);
      }
    }
    getComments();
  }, [id, user, validateComments])

  

  const handleValidateMovie = () => {
    setValidateMovie((prev) => prev + 1);
  }

  const handleValidateUser = () => {
    setValidateUserDetails((prev) => prev + 1);
  }

  const handleValidateComments = () => {
    setValidateComments((prev) => prev + 1);
  }

  if (loadingUser || loadingMovie || loadingComments) {
    return <MovieSkelton />;
  }

  if(errorMovie || errorUser || errorComments){
    throw new Error(errorMovie || errorUser || errorComments);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${movie.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "background.default",
          opacity: 0.9,
        },
      }}
    >
      <Box sx={{ padding: 2 , paddingTop: "100px", width: { xs: "100%", lg: "70%" }, zIndex: 22}}>
        <MovieDetailsBanner movieDatiels={movie} userDetails={userDetails} handleValidateMovie={handleValidateMovie} handleValidateUser={handleValidateUser}/>
      
        <Stack
          spacing={3}
        >
          <Typography variant="h3">Comments</Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmitAddComment)} noValidate >
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <TextField
                sx={{backgroundColor: "background.paper"}}
                multiline
                fullWidth
                minRows={4}
                maxRows={4}
                id="outlined-multilined"
                placeholder="Write a comment"
                variant="filled"
                {...register('commentText',  {required: true})}
                error={!!errors.commentText}
              />
              <Button
                size="large"
                type="submit"
                sx={{
                  backgroundColor: "background.paper",
                  color: 'text.primary',
                  p: "8px 25px",
                  "&:hover": {
                    backgroundColor: "#55fdc4",
                  },
                }}>
                {isSubmitting ? <CircularProgress /> : "Send"}
              </Button>
            </Stack>
          </Box>
          {comments.map((comment) => {
            return <Comment comment={comment} movie={movie} user={userDetails} handleValidateComments={handleValidateComments}/>;
          })}
        </Stack>
      
      </Box>
    </Box>
  );
};

export default MovieComponent;
