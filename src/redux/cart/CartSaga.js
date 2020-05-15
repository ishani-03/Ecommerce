import {all , call , put, takeLatest } from 'redux-saga/effects'
import UserActionTypes from '../user/UserTypes'
import { clearCart } from './CartActions'


export function* clearCartOnSignOut(){
    yield put(clearCart())
}


export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut )
}

export function* cartSagas(){
    yield all([
        call(onSignOutSuccess)
    ])
}