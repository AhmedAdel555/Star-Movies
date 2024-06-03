import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IProp{
  icon: ReactNode
  title: string;
  count: number
}

const DashboardCard = ({icon, title, count} : IProp) => {
  return (
    <Card sx={{ height: '100%', minWidth: "20%", width:"250px" }}>
    <CardContent>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
        <Stack spacing={1}>
          <Typography color="text.secondary" variant="overline">
            {title}
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </Stack>
        <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
           {icon}
        </Avatar>
      </Stack>
    </CardContent>
  </Card>
  );
}

export default DashboardCard