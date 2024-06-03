import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from '../validations';
import { Navigate, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../firebase';
import { useContext, useState } from 'react';
import AuthContext from '../contexts/authContext';

interface IFormInput {
  email: string;
  password: string;
}

export default function SignIn() {

  const {user, loading, error} = useContext(AuthContext)

  const [signUpError, setSignUpError] = useState<string>("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IFormInput>({
    resolver: yupResolver(SignInSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setSignUpError(error.message)
      }
    }
  };

  if(signUpError){
    toast.error(signUpError, {
      duration: 4000,
      position: 'top-center',
    })
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
          position: 'relative',
          minHeight: "100vh",
          height: '100%',
          backgroundImage: 'url(banar.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Black overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        {/* Logo */}
        <Box
          sx={{
            position: 'absolute',
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  type='email'
                  autoComplete="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting? <CircularProgress /> : "Sign In"} 
                </Button>
                <Grid container>
                  <Grid item flexGrow={1} />
                  <Grid item>
                    <Link component={RouterLink} to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
}