import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Login  from "../../../assets/logo-login.png";
import FormLogin from './FormLogin';

export default function ContenedorLogin() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
            sx={{ height: 300 }}
            component={'img'}
            style={{
                width:"50",
                height:"50",
                objectFit:"contain"

            }}
            alt='green iguana'
            image={Login}
            title="green iguana"
            />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Inicio de sesión
          </Typography>
        </CardContent>
      </CardActionArea>
          <FormLogin/>
    </Card>
  );
}
