import React , {useState} from 'react'
import FormInput from '../Form-input/FormInput'
import CustomButton from '../Custom-button/CustomButton'
import './SignIn.scss'
// import {auth,signInWithGoogle} from '../../firebase/Firebase'
import { googleSignInStart , emailSignInStart } from '../../redux/user/UserAction'
import {connect } from 'react-redux'



const SignIn =({emailSignInStart , googleSignInStart})=>{

    const [userCredentials, setCredentials] = useState({email:'', password:''})
    const {email,password}= userCredentials;


    const handleSubmit=async event=>{
        event.preventDefault();
        
        
        emailSignInStart(email , password)
        // try{
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({email:'',password:''})
        // }
        // catch(error){
        //     console.log(error)
        // }
        // this.setState({emial:'', password:''})
        //** No more setState. Redux will handle the state from here on out with sagas */

    }


    const handleChange=(event)=>{
        const{value,name}=event.target;
        setCredentials({ ...userCredentials , [name]:value})
    }


        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" value={email} required
                    handleChange={handleChange} label='email'></FormInput>
                    <FormInput name="password" type="password" value={password} required
                    handleChange={handleChange} label='password'></FormInput>
                    <div className='buttons'>
                    <CustomButton type='submit'> Sign-In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Google Sign-In</CustomButton>
                    </div>
                </form>
            </div>
        )
    
}


const mapDispatchToProps = dispatch =>({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email,password) => dispatch(emailSignInStart({email, password}))
})

export default connect (null,mapDispatchToProps)(SignIn) 
