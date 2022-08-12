// empty messages
const initialState = []

export default (msg_list = initialState, action) => {

    switch( action.type ) {
        case 'GET-MESSAGES':
            if(action.payload.length !== 0) return action.payload[0].messages;
            else return initialState
        default:
            return msg_list;
    }

} 