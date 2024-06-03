import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress, Paper } from "@mui/material";
import { SignUpSchema } from "../validations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { handleSignUp } from "../actions/AuthActions";
import { useContext, useState } from "react";
import AuthContext from "../contexts/authContext";
import { Link as RouterLink } from 'react-router-dom';


interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {

  const {user, loading, error} = useContext(AuthContext)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(SignUpSchema),
  });

  const [signUpError, setSignUpError] = useState<string>("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await handleSignUp(data.email, data.password, data.username);
      navigate("/signin");
    } catch (error) {
      if (error instanceof Error) {
        setSignUpError(error.message);
      }
    }
  };

  if (signUpError) {
    if (signUpError === "Firebase: Error (auth/email-already-in-use).") {
      toast.error(
        "Email is already in use. Please try with a different email.",
        {
          duration: 4000,
          position: "top-center",
        }
      );
    } 
    else {
      toast.error(
        "An error occurred while creating your account. Please try again later.",
        {
          duration: 4000,
          position: "top-center",
        }
      );
    }
    setSignUpError('');
  }

  if(loading){
    return <CircularProgress />
  }
  if(error){
    throw new Error(error);
  }

  if(user.uid) return <Navigate to={'/'} replace/>;

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          height: "100%",
          backgroundImage: "url(banar.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <Typography variant='h3'>
              STARMOVIES
          </Typography>        
        </Box>
        <Container component="main" maxWidth="xs" sx={{ zIndex: 1 }}>
          <Paper elevation={6} sx={{ padding: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress /> : "Sign Up"}
                </Button>
                <Grid container>
                  <Grid item flexGrow={1} />
                  <Grid item>
                    <Link component={RouterLink} to="/signin" variant="body2">
                      {"already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Toaster />
    </>
  );
};

export default SignUp;
