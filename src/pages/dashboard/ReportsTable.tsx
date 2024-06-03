import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import AlertDialog from "../../components/AlertDialog";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useEffect, useState } from "react";
import { deleteReportAndCommentById, deleteReportById, getAllReports } from "../../actions/ReportsActions";
import { IReport } from "../../interfaces";

const ReportsTable = () => {

  const [reportedComments, setReportedComments] = useState<IReport[]>([])

  const [selectReportItems, setSelectReportItems] = useState('');

  const [reportedCommentsValidate, setReportedCommentsValidate] = useState(0);

  const handleDeleteCommentWithAllReports = async () => {
     const items = selectReportItems.split(',');
     await deleteReportAndCommentById(items[0], items[1]);
     setReportedCommentsValidate((prev) => prev + 1);
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteReport = async (id: string) => {
    await deleteReportById(id);
    setReportedCommentsValidate((prev) => prev + 1);
  };

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID' , flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'movie', headerName: 'Movie', flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'comment', headerName: 'Comment', flex: 1,
    align: "center",
    headerAlign: "center"},
    {
      field: 'actions', headerName: 'Actions', flex: 1, align: "center", headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton onClick={() => {
            setSelectReportItems(`${params.row.movieId},${params.row.commentId}`);
            handleClickOpen()
          }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteReport(params.row.id)}>
            <CancelOutlinedIcon />
          </IconButton>
        </>
      )
    },
  ];

  useEffect(() => {
    const getReports = async () => {
      const allGenres = await getAllReports();
      setReportedComments(allGenres);
    }
    getReports();

  }, [reportedCommentsValidate])

  const rows: GridRowsProp = reportedComments.map((report) => {
     return {id: report.id, movie: report.movieName, comment: report.commentContent, movieId: report.movieId, commentId: report.commentId}
  })

  return (
    <>
        <Typography
          sx={{
            fontWeight: "bold",
          }}
          variant="h4"
        >
          Reports
        </Typography>
      <Box sx={{ height: 650, mx: "auto" }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        message="Are You Sure to Delete this Comment"
        itemId={selectReportItems}
        agreeFunction={handleDeleteCommentWithAllReports}
      />
    </>
  );
};

export default ReportsTable;
