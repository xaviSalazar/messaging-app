import { useState } from "react";
import { useDispatch } from 'react-redux';
import { configPhoneNumber } from "../redux/ConfigToken/Actions";


const Settings = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [token, setToken] = useState('')

    const dispatch = useDispatch();

    const setConfigurations = () => {
        
        if( phoneNumber && token)
        {
            console.log('clicked')
            const config = {
                phoneNumber : phoneNumber,
                token : token
            }

        dispatch(configPhoneNumber(config));
        }
    }

    const inputPhoneNum = (typedText) =>{
        setPhoneNumber(typedText);
    } 

    const inputToken = (typedText) =>{
        setToken(typedText)
    } 

    return (
        <div className="settings-app">
            <label >
                Insert phone number:
            </label>
            <input type="text" onChange={(e) => inputPhoneNum(e.target.value)}/>
            <br/>
            <label >
                Insert secret token:
            </label>
            <input type="text" onChange={(e) => inputToken(e.target.value)}/>
            <br/>
            <button onClick={setConfigurations}>
                Click to apply values
            </button>

        </div>
    );
}

export default Settings;