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
import Main from './pages/Main';

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
                  <Main />
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
