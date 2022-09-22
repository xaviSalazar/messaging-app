import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {

  return (
    <tr className="editable">
       <td><input className="checkbox" type='checkbox' /></td>  
      <td >
        <input
          type="text"
          required="required"
          placeholder="Ingrese Asunto..."
          name="Asunto"
          value={editFormData.Asunto}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Ingrese Apellidos..."
          name="Apellidos"
          value={editFormData.Apellidos}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Ingrese Nombres..."
          name="Nombres"
          value={editFormData.Nombres}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Ingrese lugar de trabajo..."
          name="Lugar de Trabajo"
          value={editFormData['Lugar de Trabajo']}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          name="Email"
          placeholder="Ingrese Email..."
          value={editFormData.Email}
          onChange={handleEditFormChange}
          ></input>
      </td>
    
      <td>
        <input
          type="text"
          name="Celular"
          placeholder="Ingrese Celular..."
          value={editFormData.Celular}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input
          type="text"
          name="Direccion"
          placeholder="Direccion"
          value={editFormData['Direccion']}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input
          type="text"
          name="Notas"
          placeholder="Ingrese notas"
          value={editFormData.Notas}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
