import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { configPhoneNumber } from "../redux/ConfigToken/Actions";
import EditIcon from '@material-ui/icons/Edit';
import {  IconButton } from '@material-ui/core';
import { Button } from "@material-ui/core";
import { PersonalVideo } from "@material-ui/icons";
            

const Settings = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [token, setToken] = useState('')
    const [phoneId, setPhoneId] = useState('')
    // local state to input
    const [isDisabled, setIsDisabled] = useState({ phone_num: true, what_token: true, phone_id: true});
    const [inputValues, setInputValues] = useState({ phoneNumber: "inserte numero", what_token: "inserte token", phone_id: "inserte phone id" });

    useEffect(() => { 

        const itemStr = localStorage.getItem("whatsapp_app")
        if(!itemStr) 
        {
            return;
        }
        const item = JSON.parse(itemStr);
       // setInputValues({ phoneNumber: item.phoneNumber, what_token: item.token })

    }, [])

    const handleClick = ( value ) => {
        
        if(value === 'phone_num') {
            let lock = !isDisabled.phone_num
            setIsDisabled({...isDisabled, phone_num: lock})
        }
        if(value === 'what_token') {
            let lock = !isDisabled.what_token
            setIsDisabled({...isDisabled, what_token: lock})
        }

        if(value === 'phone_id') {
            let lock = !isDisabled.phone_id
            setIsDisabled({...isDisabled, phone_id: lock})
        }
        console.log(value)
       
    }


    const setConfigurations = () => {

        if( phoneNumber && token)
        {
            console.log('clicked')

            const config = {
                phoneNumber : phoneNumber,
                token : token,
                phoneId : phoneId
            }

            localStorage.setItem("whatsapp_app", JSON.stringify(config))
            alert("saved data")

        }
    }


    return (
        <div className="settings-app">
            <label >
                Insert phone number:
            </label>
            <input type="text" value = {inputValues.phoneNumber} disabled = {isDisabled.phone_num} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <IconButton onClick = {() => handleClick('phone_num')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert secret token:
            </label>
            <input type="text" value = {inputValues.what_token} disabled = {isDisabled.what_token} onChange={(e) => setToken(e.target.value)}/>
            <IconButton onClick = {() => handleClick('what_token')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert number id:
            </label>
            <input type="text" value = {inputValues.phone_id} disabled = {isDisabled.phone_id} onChange={(e) => setPhoneId(e.target.value)}/>
            <IconButton onClick = {() => handleClick('phone_id')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <br/>
            <br/>
            <Button 
                variant="contained"
                onClick={setConfigurations}
            >
                VALIDATE TOKENS
            </Button>

        </div>
    );
}

export default Settings;