import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CrChips from './CrChips';
import CrRating from './CrRating';
import { IconButton, Stack } from '@mui/material';
import CrBtnAccion from './CrBtnAccion';
import { useContext, useEffect, useState } from 'react';
import CrModal from './CrModal';
import { Product } from '../types/Product';
import { useHistory } from 'react-router-dom';
import { TurnLeft } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PaymentContext } from '../store/payment/PaymentContext';
import CrCounter from './CrCounter';


interface Props {
    item: Product   
    handleAddCard : (product : Product) => void
    isVisible? : boolean
}
export default function CrCard({ item , handleAddCard, isVisible = true}: Props) {
    const [isCheck, setValor] = useState(true)
    const {setProduct, removeProduct,updateProductQuantity, products} = useContext(PaymentContext)
    
    //const [addCardPayment, setAddCardPayment] = useState<Product[]>([])

    useEffect(() => {
        const isProductInCart = products.some(product => product.id === item.id);
        setValor(!isProductInCart); 
      }, [products, item.id]);
    
    

    const [open, setOpen] = useState(false);

    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //history.push(`/detalles/${item.id}`)
    };
    
    const handleCheck = ()=>{
        setValor(!isCheck)
        item.quantity = 1
        handleAddCard(item)
    }

    const removeProduct1 = ()=>{
        console.log('click ', item.id)
        removeProduct(item.id)

    }

    function formatDescription(description: string, maxLength: number): string {
        if (description.length > maxLength) {
          return description.substring(0, maxLength) + "...";
        } else {
          return description.padEnd(maxLength, ' ');
        }
      }


      const handleCountChange = (newCount: number) => {
        updateProductQuantity(item.id, newCount);
      }; 

  return (
    <>
    
        <Card sx={{ maxWidth: 345 }}>
            <Stack direction="row" m={2} spacing={2}>
                <CrChips visible = {isVisible} ></CrChips>
            </Stack>
        <CardMedia
            sx={{ height: 300 }}
            component={'img'}
            style={{
                width:"200",
                height:"200",
                objectFit:"contain"

            }}
            alt='green iguana'
            image= {item.image}
            title="green iguana"
            />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{}}>
                {formatDescription(item.title,23)}
            </Typography>
        <Typography variant="body2" color="text.secondary">
            {item.price}
            </Typography>
            {isVisible ? (<CrRating></CrRating>):''}
            
        </CardContent>
        <CardActions sx={{
            display:'flex',
            justifyContent: 'space-between'

        }}>
            <CrBtnAccion isShow isCheck={isCheck} handleShow={handleClickOpen } ></CrBtnAccion>
            {isVisible ? (""):
            (<CrCounter initialCount={item.quantity} onCountChange={handleCountChange} ></CrCounter>)
            }
            
            {isVisible ? (<CrBtnAccion isCheck={isCheck} handleCheck={handleCheck} ></CrBtnAccion>):
            (<CrBtnAccion isCheck={isCheck} handleCheck={removeProduct1} visibleBtnDelete></CrBtnAccion>)
            }
            
        </CardActions>
        </Card>
        <CrModal open={open} handleClose={handleClose} title={item.title} description={item.description} image={item.image} nombreButton= {"Cerrar"}></CrModal>
    </>
  );
}
