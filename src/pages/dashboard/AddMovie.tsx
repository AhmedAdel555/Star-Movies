import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { addMovie } from "../../actions/MovieActions";
import { getAllGenres } from "../../actions/GenreActions";
import { IGenre } from "../../interfaces";
import { yupResolver } from '@hookform/resolvers/yup';
import { AddMovieSchema } from "../../validations";

interface IFormInput {
  name: string;
  description: string;
  publishName: string;
  genre: string;
}

const AddMovie = () => {

  const [genres, setGenres] = useState<IGenre[]>([])

  useEffect(() => {
    const getGenres = async () => {
      const allGenres = await getAllGenres();
      setGenres(allGenres);
    }
    getGenres();

  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(AddMovieSchema),
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!thumbnail || !video) {
      toast.error("thumbnail and video is required", {
        duration: 4000,
        position: 'top-center',
      })
      return;
    }
    try {
      await addMovie(thumbnail, video, data.name, data.description, data.publishName, data.genre)
      setThumbnail(null);
      setVideo(null);
      toast.success("Movie added successfully", {
        duration: 4000,
        position: 'top-center',
      })
    } catch (error) {
      toast.error("Error adding movie", {
        duration: 4000,
        position: 'top-center',
      })
    }finally{
      reset();
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
          Add New Movie
        </Typography>

        < Divider sx={{marginY: "10px"}} />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <TextField
            {...register("name")}
            label="Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{backgroundColor: "background.paper"}}
          />

          <TextField
            {...register("description")}
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{backgroundColor: "background.paper"}}
          />

          <TextField
            {...register("publishName")}
            label="Publish Name"
            variant="outlined"
            error={!!errors.publishName}
            helperText={errors.publishName?.message}
            sx={{backgroundColor: "background.paper"}}
          />

          <FormControl variant="outlined" error={!!errors.genre}  sx={{backgroundColor: "background.paper"}}>
            <InputLabel>Genre</InputLabel>
            <Select
              {...register("genre", { required: "Genre is required" })}
              label="Genre"
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            margin: "0 auto",
          }}>
          <Button variant="contained" component="label" sx={{ flex: 1 , backgroundColor: "background.paper" }}>
            Upload Thumbnail
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setThumbnail(e.target.files ? e.target.files[0] : null)
              }
            />
          </Button>
          <Button variant="contained" component="label" sx={{ flex: 1, backgroundColor: "background.paper" }}>
            Upload Video
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) =>
                setVideo(e.target.files ? e.target.files[0] : null)
              }
            />
          </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", backgroundColor: "background.paper" }}
            disabled={isSubmitting}
            >
              {isSubmitting? <CircularProgress /> : "Add Movie"} 
          </Button>
          </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default AddMovie;
