import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

interface Props {
  visible : boolean
}
export default function CrChips({visible}:Props) {

  const [discount, setDiscount] = useState('');

  useEffect(() => {
    // Generar un porcentaje de descuento aleatorio entre 10% y 50%
    const randomDiscount = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    setDiscount(`${randomDiscount}% off`);
  }, []);
  

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Chip label={discount} color="success" style={{ display: visible ? 'block' : 'none' }}/>
      </Stack>     
    </Stack>
  );
}
