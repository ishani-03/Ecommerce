import React from 'react'
import CollectionOverview from '../../components/collection-overview/CollectionOverview'
import { Route } from 'react-router-dom'
import Collection from '../collection/Collection'
import {firestore , convertCollectionsSnapshotToMap} from '../../firebase/Firebase'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/ShopActions'
import WithSpinner from '../../components/withSpinner/WithSpinner'


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionWithSpinner = WithSpinner(Collection)


class Shop extends React.Component  {
    state = {
        loading : true
    }
    unsubscribeFromSnapshot=null;

    componentDidMount(){
        const { updateCollections } = this.props
        const collectionRef= firestore.collection('collections');

        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     // console.log(snapshot)
        //     const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
        //     console.log(collectionsMap)
        //     updateCollections(collectionsMap)
        //     this.setState({ loading : false })
        // }) ** This is object returning method

        // collectionRef.get().then(
        //     snapshot => {
        //             // console.log(snapshot)
        //             const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
        //             console.log(collectionsMap)
        //             updateCollections(collectionsMap)
        //             this.setState({ loading : false })
        //         }
        // ) **this is a promise based request

        fetch('https://firestore.googleapis.com/v1/projects/crown-db-f5972/databases/(default)/documents/collections')
        .then(response => response.json())
        .then(collections => console.log(collections))

        collectionRef.get().then(
            snapshot => {
                    // console.log(snapshot)
                    const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
                    console.log(collectionsMap)
                    updateCollections(collectionsMap)
                    this.setState({ loading : false })
                }
        )
    }

    render(){
        const {match} = this.props;
        const { loading } = this.state
    return(
            <div className='shop=page'>
                < Route exact path={`${match.path}`} 
                render = { ( props ) =>  <CollectionOverviewWithSpinner isLoading={ loading } {...props} /> } /> 
                < Route exact path={`${match.path}/:collectionId`} 
                render = { ( props ) =>  <CollectionWithSpinner isLoading={ loading } {...props} /> }  />
            </div>
        )
        
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(Shop)