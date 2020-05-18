import React ,{useEffect} from 'react';
import './App.scss';
import Homepage from './pages/Homepage/Homepage'
import Shop from './pages/shop/Shop'
import {Route,Switch,Redirect} from 'react-router-dom'
import Header from './components/Header/Header'
import SignUpSignIn from './pages/SignUp-SignIn/SignUpSignIn'
//  import {auth , createUserProfileDocument , **addCollectionAndDocuments} from './firebase/Firebase'
// import {auth , createUserProfileDocument} from './firebase/Firebase'
import {connect} from 'react-redux'
// import {setCurrentUser} from './redux/user/UserAction'
import { selectCurrentUser } from '../src/redux/user/UserSelector'
import { createStructuredSelector } from 'reselect'
import Checkout from '../src/pages/checkout/Checkout'
//  ** import {selectColletionsForPreview} from './redux/shop/ShopSelector'
import { checkUserSession } from './redux/user/UserAction'

const App =({ checkUserSession , currentUser })=>{
  

  // unsubscribeFromAuth=null;

  useEffect(() => {
    checkUserSession()
  } , [checkUserSession])

 /* componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession()
  //   // const {setCurrentUser, **collectionsArray}=this.props;
  //   // const {setCurrentUser}=this.props;

  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   //   if(userAuth){
  //   //     const userRef = await createUserProfileDocument(userAuth);



  //   //     //ref. in lecture 91
  //   //     userRef.onSnapshot(snapShot=>{
  //   //       setCurrentUser ({
  //   //           id: snapShot.id,
  //   //           ...snapShot.data()
  //   //         })
  //   //       })
  //   //       // console.log(snapShot.data()) 
  //   //   }
  //   //   setCurrentUser(userAuth) ;
  //     // ** addCollectionAndDocuments('collections', collectionsArray.map(({title, items})=> ({title, items})) )
  //   // });
  // } 
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }*/

  


    return (
      <div>
        <Header/>
        <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={Shop} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/signin' render={()=>currentUser
           ? (<Redirect to='/' />) 
           :( <SignUpSignIn/>)} />
        </Switch>
        
      </div>
    ); 
}

const mapStateToProps=createStructuredSelector ({
  currentUser: selectCurrentUser 
  // ** collectionsArray : selectColletionsForPreview 
  // ** - We did all of this so we don't have to manually enter each collection and item into firebase
})

// const mapStateToProps = ({ user , collections }) => ({
//   currentUser: user.currentUser,
//   collectionsArray : collections.collectionsArray
// });

const mapDispatchToProps =dispatch =>({
  checkUserSession: () => dispatch(checkUserSession())
})

// const mapDispatchToProps= dispatch=>({
//   setCurrentUser:user =>dispatch(setCurrentUser(user))
// }) //** We removed this mapDispatchToProps as noe sagas is handling setting our current user on success */

// export default connect(mapStateToProps,mapDispatchToProps)(App);
export default connect(mapStateToProps,mapDispatchToProps)(App);