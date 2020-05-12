import ShopActionTypes from './ShopTypes'
import {firestore , convertCollectionsSnapshotToMap} from '../../firebase/Firebase'

// export const updateCollections = (collectionsMap) =>({
//     type : ShopActionTypes.UPDATE_COLLECTIONS,
//     payload : collectionsMap
// })

//Using redux thunk:function that returns a function that gets dispatched so that whenever dispatch is called it fire multiple actions

export const fetchCollectionsStart = () => ({
    type : ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload : collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload : errorMessage
})

//this is going to be the actual function that we pass into our component to begin this process
export const fetchCollectionsStartAsync = () => {
    return dispatch =>{
        const collectionRef= firestore.collection('collections');
        dispatch(fetchCollectionsStart)
        collectionRef.get().then(
            snapshot => {
                    console.log(snapshot)
                    const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
                    console.log(collectionsMap)
                    // updateCollections(collectionsMap)
                    dispatch(fetchCollectionsSuccess(collectionsMap))
                    // this.setState({ loading : false })
                }).catch(error => dispatch(fetchCollectionsFailure(error.message)) )
    }
}