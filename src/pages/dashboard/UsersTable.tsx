import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import { getAllUsers } from "../../actions/UserActions";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const UsersTable = () => {

  const [users, setusers] = useState<IUser[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await getAllUsers();
      setusers(allUsers);
    }
    getUsers();

  }, [])

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID' , flex: 1,
    align: "center",
    headerAlign: "center"},
    {field: 'name', headerName: 'Name', flex: 1,
    align: "center",
    headerAlign: "center",},
    {field: 'email', headerName: 'Email', flex: 1,
    align: "center",
    headerAlign: "center",},
  ];

  const rows: GridRowsProp = users.map((user) => {
    return { id: user.id, name: user.username, email: user.email}
  })

  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
        }}
        variant="h5"
      >
        Users
      </Typography>
      <Box sx={{ height: 650, mx: "auto"}}>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </>
  )
}

export default UsersTable