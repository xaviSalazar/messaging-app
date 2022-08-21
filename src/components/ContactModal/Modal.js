import React from "react";
import './Modal.css'
import { useState } from 'react'
import {createUser} from '../../api/index'
import {useSelector} from 'react-redux'


function MyForm({ closeForm }) {

    const [phoneNumber, setPhoneNumber] = useState({});
    const [name, setName] = useState({});

    let auth = useSelector(state => state.customerReducer.auth)
    //console.log(auth?.data?.responseData?.lastName)

    const inputPhoneNum = (typedText) =>{
        setPhoneNumber(typedText);
    } 

    const inputName = (typedText) =>{
        setName(typedText)
    } 

    const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
        name: name,
        phoneNumber: phoneNumber,
        owner: auth.data.responseData._id
      }

     //console.log(data)
     createUser(data);
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeForm(false)}> X </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label> Enter Contact Name:
                        <input
                            type="text"
                            //name="name"
                            //value={inputs.uname || ""}
                            name = "uname" required
                            onChange={(e) => inputName(e.target.value)}
                        />
                    </label>

                    <label> Enter phone number:
                        <input
                            type="text"
                            // name="phoneNumber"
                            // value={inputs.uphone || ""}
                            onChange={(e) => inputPhoneNum(e.target.value)}
                            name = "uphone" required
                        />
                    </label>
                    <input type="submit" />

                </form>

                <div className="footer">
                    <button id="cancelBtn" onClick={() => closeForm(false)}>Cancel</button>
                    <button>Save Contact</button>
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
