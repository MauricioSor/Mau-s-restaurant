export const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                rol:action.payload.rol,
                isAuth:true,
            }
        case 'LOGOUT':
            return {
                ...state,
                user:null,
                isAuth:false,
                rol:null,
            }
        default:
            return state
    }
}