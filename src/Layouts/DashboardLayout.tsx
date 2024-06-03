import * as React from 'react';
import DashbaordAppBar from '../components/DashbaordAppBar';
import DashboardDrawer, { DrawerHeader } from '../components/DashboardDrawer';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <DashbaordAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DashboardDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
         <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
