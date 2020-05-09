import React from 'react'
import './SignUp.scss'
import FormInput from '../Form-input/FormInput'
import CustomButton from '../Custom-button/CustomButton'
import {auth , createUserProfileDocument} from '../../firebase/Firebase'


class SignUp extends React.Component{
    constructor(){
        super()
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''

        }
    }

    handleSubmit=async event=>{
        event.preventDefault();
        const {displayName,email,password,confirmPassword}=this.state;
        if(password !== confirmPassword){
            alert("Password doesn't match")
            return;
        }
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName}); //we are using await because we want to wait till the proccedure is complete
            //for creating the account and when account is created we want to set our state back to null

            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            })//this will clear our from
        }
        catch(error){
            console.error(error)
        }
    }

    handleChange=(event)=>{
        const {name,value}=event.target;
        this.setState({[name]:value})

    }

    render(){
        const {displayName,email,password,confirmPassword}=this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>SignUp with email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                      type="text" name="displayName" value={displayName} onChange={this.handleChange}
                      label="Display Name" required />
                    <FormInput
                      type='email' name="email" value={email} onChange={this.handleChange}
                      label="Email" required />
                    <FormInput
                      type='password' name="password" value={password} onChange={this.handleChange}
                      label="Password" required />
                    <FormInput
                      type='password' name="confirmPassword" value={confirmPassword} onChange={this.handleChange}
                      label="Confirm Password" required />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                    
                </form>

            </div>
        )
    }
}

export default SignUp