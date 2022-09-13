import React from "react";
import './Modal.css'
import { useState } from 'react'
import {createUser} from '../../api/index'
import {useSelector} from 'react-redux'
import PhoneInput from 'react-phone-number-input'


function MyForm({ closeForm }) {

    // const [phoneNumber, setPhoneNumber] = useState({});
    const [name, setName] = useState({});

    let auth = useSelector(state => state.customerReducer.auth)
    //console.log(auth?.data?.responseData?.lastName)

    // const inputPhoneNum = (typedText) =>{
    //     setPhoneNumber(typedText);
    // } 

    const [valor, setValor] = useState()

    const inputName = (typedText) =>{
        setName(typedText)
    } 

   

    const handleSubmit = (event) => {
      event.preventDefault();
      let phoneNumber = valor.slice(1)
      const data = {
        name: name,
        phoneNumber: phoneNumber,
        owner: auth.data.responseData._id
      }
     createUser(data);
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeForm(false)}> X </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label> Ingreses nombres de contacto:
                        <br/>
                        <input
                            type="text"
                            //name="name"
                            //value={inputs.uname || ""}
                            name = "uname" required
                            onChange={(e) => inputName(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label> Ingrese numero de celular:
                    <PhoneInput
                            type="text"
                            placeholder="Ingrese Numero"
                            value={valor}
                            onChange={setValor}/>
                    </label>
                    {/* <label> Ingrese su numero telefonico: */}
                        {/* <input
                            type="text"
                            // name="phoneNumber"
                            // value={inputs.uphone || ""}
                            onChange={(e) => inputPhoneNum(e.target.value)}
                            name = "uphone" required
                        /> */}
                    {/* </label> */}
                    <br/>
                    <input type="submit" value="AGREGAR CONTACTO"/>
                </form>

                <div className="footer">
                    <button id="cancelBtn" onClick={() => closeForm(false)}>Cancel</button>
                    <button>Continuar</button>
                </div>
            </div>
        </div>
    )
}

function Modal({ closeModal }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="title">
                    <h1>Are you sure you want to continue?</h1>
                </div>
                <div className="body">
                    <p>The next page is awesome! yo should move forward, you will enjoy it</p>
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={() => closeModal(false)}>Cancel</button>
                    <button>Save Contact</button>
                </div>
            </div>
        </div>
    )
}

export { Modal, MyForm };
