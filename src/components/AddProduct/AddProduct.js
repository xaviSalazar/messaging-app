import React from 'react'
import './AddProduct.css'
import { LoadImage } from './LoadImage'

const AddProduct = ({handleAddFormChange, handleAddFormSubmit, setContactToggle, setFile}) => {
  return (
    <div className='newcontact'>
        <div className="wrapper">
        <button id='cross' onClick={()=>setContactToggle(false)}>X</button>
        <h2>Agregar nuevo producto</h2>
      <form className='contact-form' onSubmit={handleAddFormSubmit}>
      <label>Imagen del producto: </label>
      <input
          id="fUpload"
          type="file"
          name="Product_image"
          required="required"
          onChange={handleAddFormChange}
          />
      <label>Titulo de producto: </label>
      <input
          type="text"
          name="Producto_titulo"
          required="required"
          placeholder="Ingrese titulo del producto..."
          onChange={handleAddFormChange}
        />
        <label>Descripcion producto: </label>
        <input
          type="text"
          name="Descripcion_producto"
          required="required"
          placeholder="Ingrese descripcion del producto..."
          onChange={handleAddFormChange}
        />
        <label>Precio del producto $: </label>
        <input
          type="number"
          name="Precio_producto"
          placeholder="Ingrese precio del producto"
          onChange={handleAddFormChange}
        />
        <label>Categoria del producto </label>
        <input
          type="text"
          name="Categoria_producto"
          placeholder="Ingrese Categoria del producto..."
          onChange={handleAddFormChange}
        />
        <button id='AddBtn' type="submit">Add</button>
      </form>
    </div>
    </div>
  );
}

export default AddProduct;