import React from 'react'
import './AddContact.css'

const AddContact = ({handleAddFormChange, handleAddFormSubmit, setContactToggle}) => {
  return (
    <div className='newcontact'>
        <div className="wrapper">
        <button id='cross' onClick={()=>setContactToggle(false)}>X</button>
        <h2>Add a Contact</h2>
      <form className='contact-form' onSubmit={handleAddFormSubmit}>
      <input
          type="text"
          name="Asunto"
          required="required"
          placeholder="Enter a Asunto..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Apellidos"
          required="required"
          placeholder="Enter a Apellidos..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Nombres"
          placeholder="Enter nombres."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Lugar de Trabajo"
          placeholder="Enter a Lugar de Trabajo..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="Email"
          placeholder="Enter a Email..."
          onChange={handleAddFormChange}
        />
         <input
          type="text"
          name="Celular"
          placeholder="Enter a Celular..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Direccion"
          placeholder="Enter a Direcction..."
          onChange={handleAddFormChange}
        />
         <input
          type="text"
          name="Notas"
          placeholder="Enter a Notas..."
          onChange={handleAddFormChange}
        />
        <button id='AddBtn' type="submit">Add</button>
      </form>
    </div>
    </div>
  )
}

export default AddContact