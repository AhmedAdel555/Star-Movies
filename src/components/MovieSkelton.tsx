import Card from "@mui/material/Card";
import { Box, Skeleton } from "@mui/material";

export default function MovieSkelton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          padding: 2,
          width: { xs: "100%", lg: "70%" },
          zIndex: 22,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            padding: 2,
            backgroundColor: "transparent",
            boxShadow: "none",
            zIndex: 22,
          }}
        >
          <Skeleton
            sx={{
              width: { xs: "100%", sm: "40%" },
              height: 600,
              marginRight: { sm: 2 },
              borderRadius: 5,
            }}
          />
          <Skeleton
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Align content vertically
              flex: "1",
            }}
          >
            <Skeleton variant="text" sx={{ mb: 1 }} />

            <Skeleton variant="text" sx={{ mb: 1 }} />

            <Skeleton variant="text" sx={{ mb: 1 }} />

            <Skeleton variant="text" sx={{ mb: 2 }} />
          </Skeleton>
        </Card>
        
        <Skeleton
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            height: "auto",
            width: { xs: "100%", lg: "70%" },
            padding: 2,
            backgroundColor: "transparent",
            boxShadow: "none",
            zIndex: 22,
          }}
        >
          <Skeleton
            sx={{
              width: "100%",
            }}
          />
        </Skeleton>
      </Box>
    </Box>
  );
}
