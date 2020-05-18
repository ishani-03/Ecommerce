import React , {useEffect} from 'react'
import './Collection.scss'
import CollectionItem from '../../components/CollectionItem/CollectionItem'
import {connect} from 'react-redux'
// import {createStructuredSelector} from 'reselect'
import {selectCollection} from '../../redux/shop/ShopSelector'
import {firestore } from '../../firebase/Firebase'

const Collection =( { collection }) =>{

    useEffect(()=>{
        console.log('I am subscribing')
        const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot))

        return()=>{
            console.log('I am unsubscribed')
            unsubscribeFromCollections()
        }
        //this return function is a clean-up function which can mimic any lifecycle method. here, componentWillUnmount
    },[])

    console.log('collection',collection)
    const { title , items} = collection;
return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item=>( 
                  <CollectionItem key={item.id} item={item} /> 
                    ))
            }
        </div>
    </div>
)
}

const mapStateToProps = (state , ownProps) => ({
    collection :selectCollection(ownProps.match.params.collectionId)(state)
}) 
/* {We have not used createStructuredSelector because unlike other selectors,
 this selector needs a part of the state depending on the URL parameter} */
//ownProps are the props of the component that we are wrapping in our connect
export default connect (mapStateToProps) (Collection)
