// empty messages
const initialState = []

export default (msg_list = initialState, action) => {

    switch( action.type ) {
        case 'GET-MESSAGES':
            return action.payload;
        default:
            return msg_list;
    }

} 