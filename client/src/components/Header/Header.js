import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
// import {auth} from '../../firebase/Firebase'
import {connect} from 'react-redux'
import CartIcon from '../Cart-icon/CartIcon'
import CartDropdown from '../Cart-dropdown/CartDropdown'
// import { createStructuredSelector } from 'reselect'
// import { selectCartHidden } from '../../redux/cart/CartSelector'
// import { selectCurrentUser } from '../../redux/user/UserSelector'
import { signOutStart } from '../../redux/user/UserAction'



const Header=({currentUser,hidden, signOutStart})=>(
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? (
                    // <div className='option' onClick={()=>auth.signOut()}>
                    <div className='option' onClick={signOutStart}>
                        SIGN OUT
                    </div>
                ):(
                    <Link className='option' to='/signin'>
                        SIGN IN 
                    </Link>
                )
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }
        
    </div>
)



// const mapStateToProps=(state)=>({
//     currentUser : selectCurrentUser(state)
//     , hidden : selectCartHidden(state)
// }); We can do like this or like the below manner
// const mapStateToProps= createStructuredSelector ({  //createStructuredSelector will pass the whole state to each subseqquent selector
//     currentUser : selectCurrentUser  
//     , hidden : selectCartHidden
// });

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden
  });

  const mapDispatchToProps = dispatch =>({
    signOutStart: () => dispatch(signOutStart())
  })


//mapStateToProps: is used for selecting the part of the data from the store that the connected component needs.


export default connect(mapStateToProps,mapDispatchToProps) (Header)

