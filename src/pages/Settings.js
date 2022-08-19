import { useState } from "react";
import { useDispatch } from 'react-redux';
import { configPhoneNumber } from "../redux/ConfigToken/Actions";
import EditIcon from '@material-ui/icons/Edit';
import {  IconButton } from '@material-ui/core';
import { Button } from "@material-ui/core";
            

const Settings = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [token, setToken] = useState('')
    // local state to input
    const [isDisabled, setIsDisabled] = useState({ phone_num: true, what_token: true });

    const handleClick = ( value ) => {
        
        if(value === 'phone_num') {
            let lock = !isDisabled.phone_num
            setIsDisabled({...isDisabled, phone_num: lock})
        }
        if(value === 'what_token') {
            let lock = !isDisabled.what_token
            setIsDisabled({...isDisabled, what_token: lock})
        }
        console.log(value)
       

    }

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
            <input type="text" id="phone" disabled = {isDisabled.phone_num} onChange={(e) => inputPhoneNum(e.target.value)}/>
            <IconButton onClick = {() => handleClick('phone_num')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert secret token:
            </label>
            <input type="text" disabled = {isDisabled.what_token} onChange={(e) => inputPhoneNum(e.target.value)}/>
            <IconButton onClick = {() => handleClick('what_token')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <Button 
                variant="contained"
                onClick={() => {
                    alert('clicked');
                  }}
            >
                VALIDATE TOKENS
            </Button>

        </div>
    );
}

export default Settings;