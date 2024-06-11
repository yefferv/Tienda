import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function CenteredCircularProgress() {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
    <Grid item>
      <CircularProgress />
    </Grid>
  </Grid>
  );
}