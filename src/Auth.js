import doRegisterCustomer from './redux/Authentification/Actions'
import doLoginCustomer from './redux/Authentification/Actions'
import {doCustomerAuth} from './redux/Authentification/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, {useEffect} from 'react'

const Auth = ({authRoute, redirectTo, children}) => {

    let auth = useSelector(state => state.customerReducer.auth);
    const dispatch = useDispatch();
    let navigate = useNavigate();

useEffect(() => {
    //console.log("here")
    dispatch(doCustomerAuth()).then( async (response) => {
        
       if(! response.payload.data.success) {
        //console.log(`inside false de success`)
           if(authRoute) {
                navigate(redirectTo);
           }
            
       } else {
        //console.log(`inside false (it is authenticated)`)
         if(!authRoute) {
            navigate(redirectTo)
         }
       }
        
    });

}, [dispatch, auth?.data?.success])

return children;
}

export default Auth;