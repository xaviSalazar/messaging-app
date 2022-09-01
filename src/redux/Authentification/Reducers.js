import { CUSTOMER_LOGIN, CUSTOMER_AUTH, CUSTOMER_LOGOUT} from "./types";
// empty messages
const initialState = {
    auth: null
};

const customerReducer = (state = initialState, action) => {

    switch( action.type ) {
        case CUSTOMER_LOGIN:
            console.log("esyo aquis")
            console.log(action.payload)
            return {
                auth: {
                    // data: action.payload?.data?.customer,
                    // status: action.payload?.status
                    data: action.payload,
                    status: action.payload
                }
               
            }
        
        case CUSTOMER_AUTH:
            // console.log("estoy en auth")
            // console.log(action.payload)
            return {
                auth: action.payload
            }

        case CUSTOMER_LOGOUT:
            
            const isAuth = action.payload.data.success

            //console.log(isAuth)
            return {
                 auth: !isAuth
            };

        default: 
            return state;
    }     

} 

export default customerReducer;