import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function CrRating() {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 5) + 1;
    setValue(randomValue);
  }, []);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2},
      }}
    >
      <Typography component="legend">Calificación</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}
