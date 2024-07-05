import React from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialProductState = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('El título es requerido'),
  price: Yup.number().min(0, 'El precio no puede ser negativo').required('El precio es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  category: Yup.string().required('La categoría es requerida'),
  image: Yup.string().url('Debe ser una URL válida').required('La URL de la imagen es requerida'),
});

const AddProduct: React.FC = () => {
  const { addProduct } = useProductContext();

  const formik = useFormik({
    initialValues: initialProductState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newProduct: Product = {
        ...values,
        id: uuidv4(),
        rating: { rate: 0, count: 0 },
        quantity:0
      };

      addProduct(newProduct);

      toast.success("Producto agregado correctamente", {
        position: "bottom-center",
        autoClose: 1000,
        onClose: () => {
          formik.resetForm();
        }
      });

      
    },
  });

  return (
    <>
    <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit} sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        label="Título"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        label="Precio"
        name="price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputProps: { step: 0.01 },
        }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        label="Categoria"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
      />
      <TextField
        label="URL Imagen"
        name="image"
        value={formik.values.image}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />
      
      <Button variant="contained" color="primary" type="submit">
        Adicionar
      </Button>
    <ToastContainer />
    </Box>
    </>
  );
};

export default AddProduct;
