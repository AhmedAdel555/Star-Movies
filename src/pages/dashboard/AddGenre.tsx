import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { addGenre } from "../../actions/GenreActions";
import toast, { Toaster } from "react-hot-toast";

interface IFormInput {
  name: string;
}

const AddGenre = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try{
      await addGenre(data.name);
      toast.success("Genre created successfully", {
        duration: 4000,
        position: 'top-center',
      })
    }catch(error){
      toast.error("Some thing wrong", {
        duration: 4000,
        position: 'top-center',
      })
    }
  };

  return (
  <>
      <Box>
       <Typography
        sx={{
          fontWeight: "bold",
        }}
        variant="h3"
      >
        Add New Genre
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2, display: "flex", justifyContent: "center", flexWrap:  "wrap"}}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="name"
                  type="text"
                  {...register('name',  {required: true})}
                  error={!!errors.name}
                  sx={{backgroundColor: 'background.paper'}}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 4, mb: 2, backgroundColor: 'background.paper', fontSize: 16 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting? <CircularProgress /> : "Add New Genre"} 
                </Button>
      </Box>
    </Box>
    <Toaster />
  </>
  );
};

export default AddGenre;
