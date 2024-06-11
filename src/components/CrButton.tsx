import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CrButton() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color='primary'>Contained</Button>
      
    </Stack>
  );
}