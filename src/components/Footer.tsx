import { Box, Container, Paper, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
    position: 'relative',
    bottom: 0,
    width: '100%'
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my:1
          }}
        >
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2022. [] Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}

export default Footer