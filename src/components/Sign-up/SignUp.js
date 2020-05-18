import React , {useState} from 'react'
import './SignUp.scss'
import FormInput from '../Form-input/FormInput'
import CustomButton from '../Custom-button/CustomButton'
// import {auth , createUserProfileDocument} from '../../firebase/Firebase'
import { signUpStart } from '../../redux/user/UserAction'
import { connect } from 'react-redux'


const SignUp =({signUpStart}) =>{
    const [userCredentials, setUserCredentials ] =useState({
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
    })
    const {displayName,email,password,confirmPassword}= userCredentials;


    const handleSubmit=async event=>{
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert("Password doesn't match!")
            return;
        }
        signUpStart({ displayName, email, password})
        // try{ 
        //     const { user } = await auth.createUserWithEmailAndPassword(email,password);
        //     await createUserProfileDocument(user,{displayName}); //we are using await because we want to wait till the proccedure is complete
        //     //for creating the account and when account is created we want to set our state back to null

        //     this.setState({
        //         displayName:'',
        //         email:'',
        //         password:'',
        //         confirmPassword:''
        //     })//this will clear our from
        // }
        // catch(error){
        //     console.error(error)
        // }
    }

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setUserCredentials({ ...userCredentials ,[name]:value})

    }

        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>SignUp with email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                      type="text" name="displayName" value={displayName} onChange={handleChange}
                      label="Display Name" required />
                    <FormInput
                      type='email' name="email" value={email} onChange={handleChange}
                      label="Email" required />
                    <FormInput
                      type='password' name="password" value={password} onChange={handleChange}
                      label="Password" required />
                    <FormInput
                      type='password' name="confirmPassword" value={confirmPassword} onChange={handleChange}
                      label="Confirm Password" required />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                    
                </form>

            </div>
        )
    
}

const mapDispatchToProps = dispatch =>({
    signUpStart : userCredentials=>  dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp)