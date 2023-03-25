import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Container,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import AirdropForm from './components/form/AirdropForm';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 600,
                    textAlign: 'center',
                    gap: '10px',
                  }}
                >
                  <Typography variant='h5'> Airdrop token </Typography>
                  <Typography variant='body1'>
                    {' '}
                    The format should be the same as in the Remix. For example
                    addresses field should be
                    ["0x40AF7d98e9F2844833bFdaA17ad4b7396143858b",
                    "0x40AF7d98e9F2844833bFdaA17ad4b7396143858b"], while the
                    amounts field should be ["100000000000000000000", "100000000000000000000"]{' '}
                  </Typography>
                  <AirdropForm />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
