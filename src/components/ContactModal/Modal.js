import React from "react";
import './Modal.css'
import { useState } from 'react'

function MyForm({ closeForm }) {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
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
                            name="name"
                            value={inputs.name || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <label> Enter phone number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={inputs.phoneNumber || ""}
                            onChange={handleChange}
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
