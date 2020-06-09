import UserActionTypes from './UserTypes'

const INITIAL_STATE={
    currentUser : null,
    error : null
}

const UserReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                error: null
            }
        // case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        // case UserActionTypes.EMAIL_SIGN_IN_FAILURE:

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                error: null
            }


        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default UserReducer