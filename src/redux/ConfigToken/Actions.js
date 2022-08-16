// import { getChannelList } from "../../api";

export const configPhoneNumber = (object)=> async(dispatch) => {
    dispatch({type: 'SET-CONFIG', payload: object})
}

