import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

interface CrCounterProps {
  initialCount: number;
  onCountChange: (newCount: number) => void;
}

const CrCounter = ({ initialCount, onCountChange }: CrCounterProps) => {
  const [count, setCount] = useState(initialCount || 1);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    onCountChange && onCountChange(count + 1);
  };

  
  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange && onCountChange(newCount);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleDecrement} color="primary">
        <RemoveIcon />
      </IconButton>
      <Typography variant="h6" component="span" sx={{ mx: 2 }}>
        {count}
      </Typography>
      <IconButton onClick={handleIncrement} color="primary">
        <AddIcon />
      </IconButton>

    </Box>
  );
};

export default CrCounter;