import { all, call } from 'redux-saga/effects'
import { fetchCollectionsStart } from './shop/ShopSaga'
import { userSagas } from './user/UserSaga'
import { cartSagas } from './cart/CartSaga'

export default function* rootSaga(){
    yield all([ //** all takes array of sagas */   
        call (fetchCollectionsStart),
        call(userSagas),
        call(cartSagas)
    ])
}
