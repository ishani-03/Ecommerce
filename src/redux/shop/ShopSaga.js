import { takeEvery , takeLatest , call , put } from 'redux-saga/effects'
//takeEvery listens for every action of the specific type that we pass to it 
// Sagas do not dispatch actions using dispatch keyword, they use another effect called put
import ShopActionTypes from './ShopTypes'
import { firestore , convertCollectionsSnapshotToMap } from '../../firebase/Firebase'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './ShopActions'

export function* fetchCollectionsAsync(){
   yield console.log('I am fired')


   try{
   const collectionRef= firestore.collection('collections');
   const snapshot = yield collectionRef.get()//** the value from collectionRef.get() comes in the form of promise 
   const collectionsMap = yield call(convertCollectionsSnapshotToMap , snapshot )
   yield put(fetchCollectionsSuccess(collectionsMap))
   }  
   catch(error){
    yield put(fetchCollectionsFailure(error.message))
   }  




        // dispatch(fetchCollectionsStart)
        // collectionRef.get().then(
        //     snapshot => {
        //             console.log(snapshot)
        //             const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
        //             console.log(collectionsMap)
        //             // updateCollections(collectionsMap)
        //             dispatch(fetchCollectionsSuccess(collectionsMap))
        //             // this.setState({ loading : false })
        //         }).catch(error => dispatch(fetchCollectionsFailure(error.message)) )
        
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync )
}