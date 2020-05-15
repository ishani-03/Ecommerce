import React from 'react'
import CollectionOverview from '../../components/collection-overview/CollectionOverview'
import { Route } from 'react-router-dom'
import Collection from '../collection/Collection'
// import {firestore , convertCollectionsSnapshotToMap} from '../../firebase/Firebase'
import { connect } from 'react-redux'
// import { updateCollections } from '../../redux/shop/ShopActions'
import { createStructuredSelector } from 'reselect'
// import { fetchCollectionsStartAsync } from '../../redux/shop/ShopActions';
import { fetchCollectionsStart } from '../../redux/shop/ShopActions';
import WithSpinner from '../../components/withSpinner/WithSpinner'
import { selectIsCollectionFetching , selectIsCollectionsLoaded } from '../../redux/shop/ShopSelector'


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionWithSpinner = WithSpinner(Collection)


class Shop extends React.Component  {
    // state = {
    //     loading : true
    // }
    // unsubscribeFromSnapshot=null;

    // componentDidMount(){
    //     const { updateCollections } = this.props
    //     const collectionRef= firestore.collection('collections');

    //     // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //     //     // console.log(snapshot)
    //     //     const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
    //     //     console.log(collectionsMap)
    //     //     updateCollections(collectionsMap)
    //     //     this.setState({ loading : false })
    //     // }) ** This is object returning method

    //     collectionRef.get().then(
    //         snapshot => {
    //                 // console.log(snapshot)
    //                 const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
    //                 console.log(collectionsMap)
    //                 updateCollections(collectionsMap)
    //                 this.setState({ loading : false })
    //             }
    //     ) //**this is a promise based request

    //     // fetch('https://firestore.googleapis.com/v1/projects/crown-db-f5972/databases/(default)/documents/collections')
    //     // .then(response => response.json())
    //     // .then(collections => console.log(collections))

    //     // collectionRef.get().then(
    //     //     snapshot => {
    //     //             // console.log(snapshot)
    //     //             const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
    //     //             console.log(collectionsMap)
    //     //             updateCollections(collectionsMap)
    //     //             this.setState({ loading : false })
    //     //         }
    //     // )
    // }

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
    
        // fetchCollectionsStartAsync();
        fetchCollectionsStart();
        //fetchCollectionsStart is the name of our saga
      }

    render(){
        const {match , isCollectionFetching , isColletionsLoaded} = this.props;
        // const { loading } = this.state
    return(
            <div className='shop-page'>
                < Route exact path={`${match.path}`} 
                render = { ( props ) =>  <CollectionOverviewWithSpinner isLoading={ isCollectionFetching } {...props} /> } /> 
                < Route exact path={`${match.path}/:collectionId`} 
                render = { ( props ) =>  <CollectionWithSpinner isLoading={ !isColletionsLoaded } {...props} /> }  />
            </div>
        )
        
    }
}

const mapStateToProps = createStructuredSelector ({
    isCollectionFetching : selectIsCollectionFetching,
    isColletionsLoaded : selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
  });

export default connect(mapStateToProps, mapDispatchToProps)(Shop)