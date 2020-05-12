// import SHOP_DATA from './ShopData'
import ShopActionTypes from './ShopTypes'

const INITIAL_STATE = {
    collections : null,
    isFetching : false,
    errorMessage : undefined
}

const ShopReducer =(state = INITIAL_STATE , action) =>{
    switch (action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return{
                ...state,
                isFetching : true
            }

        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS :
            return{
                ...state,
                isFetching : false ,
                collections : action.payload
            }

        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE :
            return{
                ...state,
                isFetching : false,
                errorMessage : action.payload

            }
        // case ShopActionTypes.UPDATE_COLLECTIONS :
        //     return {
        //         ...state,
        //         collections : action.payload
        //     }
        default:
           return state
    }
}

export default ShopReducer