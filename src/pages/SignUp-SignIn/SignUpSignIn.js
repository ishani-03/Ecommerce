import React from 'react'
import './SignUpSignIn.scss'
import SignIn from '../../components/Sign-in/SignIn'
import SignUp from '../../components/Sign-up/SignUp'

const SignUpSignIn =()=>(
    <div className='sign-in-and-sign-up'>
        <SignIn/>
        <SignUp/>
    </div>
)



export default SignUpSignIn