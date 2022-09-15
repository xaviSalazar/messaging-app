const initialState = []


export default (msg = initialState, action) => {
    switch( action.type ) {
        case 'NEW-MESSAGE':
            return [...msg, action.payload]
        case 'CLEAR-MESSAGES':
            return [];
        default:
            return msg;
    }
} 