import React, { useEffect } from 'react';
import { useProductContext } from '../../store/product/ProductContext';
import { Product } from '../../types/Product';
import { TextField, Button, Box, Modal, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditProductProps {
  product: Product;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('El título es requerido'),
  price: Yup.number().min(0, 'El precio no puede ser negativo').required('El precio es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  category: Yup.string().required('La categoría es requerida'),
  image: Yup.string().url('Debe ser una URL válida').required('La URL de la imagen es requerida')
});

const EditProduct: React.FC<EditProductProps> = ({ product, onCancel }) => {
  const { updateProduct } = useProductContext();

  const formik = useFormik({
    initialValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedProduct: Product = {
        ...product,
        ...values,
      };
      
      updateProduct(updatedProduct);
      
      
      toast.success("Producto actualizado correctamente", {
        position: "bottom-center",
        autoClose: 1000,
        onClose: () => {
          onCancel();
        }
      });
    },
    enableReinitialize: true, 
  });

  return (
    <>
    <Modal
      open={true}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Guardar Cambios
          </Button>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
    <ToastContainer />
    </>
  );
};

export default EditProduct;
