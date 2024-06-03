import { Box, Grid, Skeleton } from "@mui/material";

const MoviesSkelton = () => {
  return (
    <Box py={3} px={4}>
      <Box width={"100%"}>
        <Grid container columnSpacing={2} rowSpacing={0}>
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((item) => (
            <Grid
              item
              key={item}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ position: "relative", backgroundColor: "transparent" }}
            >
              <Skeleton height={250} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MoviesSkelton;
