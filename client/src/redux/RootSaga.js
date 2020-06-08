import { all, call } from 'redux-saga/effects'
import { shopSagas } from './shop/ShopSaga'
import { userSagas } from './user/UserSaga'
import { cartSagas } from './cart/CartSaga'

export default function* rootSaga(){
    yield all([ //** all takes array of sagas */   
        call(userSagas),
        call(cartSagas),
        call(shopSagas)
    ])
}
