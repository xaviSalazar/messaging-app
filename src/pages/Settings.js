import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import {  IconButton } from '@material-ui/core';
import { Button } from "@material-ui/core";
import {doSaveTokens} from "../redux/ConfigToken/Actions"
            

const Settings = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [token, setToken] = useState('')
    const [phoneId, setPhoneId] = useState('')
    const dispatch = useDispatch()
    // local state to input
    const [isDisabled, setIsDisabled] = useState({ phone_num: true, what_token: true, phone_id: true});

    useEffect(() => { 

        const itemStr = localStorage.getItem("whatsapp_app")

        if(!itemStr) 
        {
            return;
        }
      
        console.log('renderiza useEFFECT')
        const item = JSON.parse(itemStr);
        setPhoneNumber(item.phoneNumber);
        setToken(item.token);
        setPhoneId(item.phoneId);
        //setInputValues(item)
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

    const handleChangePhoneNumber = event => {
        setPhoneNumber(event.target.value);
        //console.log('PHONE NUM value is:', phoneNumber);
      };

    const handleChangeToken = event => {
        setToken(event.target.value);
        //console.log('TOKEN value is:', token);
    };

    const handleChangeId = event => {
        setPhoneId(event.target.value);
        //console.log('PHONEID value is:', phoneId);
    };


    const setConfigurations = () => {
        if( phoneNumber && token && phoneId)
        {
            console.log('clicked')

            const config = {
                phoneNumber : phoneNumber,
                token : token,
                phoneId : phoneId
            }

            dispatch(doSaveTokens(config))
        }
    }

    return (
        <div className="settings-app">
            <label >
                Insert phone number:
            </label>
            <input type="text"  disabled = {isDisabled.phone_num} onChange={handleChangePhoneNumber} value = {phoneNumber}/>
            <IconButton onClick = {() => handleClick('phone_num')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert secret token:
            </label>
            <input type="text" disabled = {isDisabled.what_token} onChange={handleChangeToken} value = {token}/>
            <IconButton onClick = {() => handleClick('what_token')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert number id:
            </label>
            <input type="text" disabled = {isDisabled.phone_id} onChange={handleChangeId} value = {phoneId}/>
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