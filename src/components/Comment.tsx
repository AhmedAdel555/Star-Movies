import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { IComment, IMovie, IUser} from "../interfaces";
import { deleteReportAndCommentById, reportComment } from "../actions/ReportsActions";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

interface IProp {
  comment: IComment;
  movie: IMovie;
  user: IUser;
  handleValidateComments: () => void;
}

const Comment = ({comment, movie, user, handleValidateComments}: IProp) => {

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box sx={{ width: "100%", p: "15px" , backgroundColor: "background.paper", borderRadius: 4}}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}
        >
          <Box sx={{display: "flex" , gap: 3}}>
          <Typography fontWeight="bold" fontSize={16}>
             {comment.publisherName}
          </Typography>
          <Typography fontWeight="bold" fontSize={16}>
             {comment.publishDate.toDateString()}
          </Typography>
          </Box>
          <Box sx={{display: "flex" , gap: 3}}>
          {loading ? <CircularProgress /> :comment.publisherId === user.id ? <Button
            sx={{
              fontWeight: 500,
              textTransform: "capitalize",
              backgroundColor: "red",
              color: "text.secondary",
              '&:hover': {
                backgroundColor: "red",
                color: "text.secondary",
              }
            }}
            onClick={async () => {
              setLoading(true)
              await deleteReportAndCommentById(movie.id, comment.id);
              setLoading(false)
              handleValidateComments();
            }}
          >
            Delete
          </Button> : <Button
            sx={{
              fontWeight: 500,
              textTransform: "capitalize",
              backgroundColor: "red",
              color: "text.secondary",
              '&:hover': {
                backgroundColor: "red",
                color: "text.secondary",
              }
            }}
            onClick={async () => {
              setLoading(true)
              await reportComment(comment.id, comment.content ,movie.id, movie.name);
              setLoading(false)
              toast.success(
                "Report has been sent.",
                {
                  duration: 4000,
                  position: "bottom-right",
                }
              );
            }}
          >
            Report
          </Button>}
          </Box>
        </Stack>
        <Typography variant="body2">
          {comment.content}
        </Typography>
      </Box>
      <Toaster />
    </>
  );
};

export default Comment;
