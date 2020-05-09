import React from 'react'
import FormInput from '../Form-input/FormInput'
import CustomButton from '../Custom-button/CustomButton'
import './SignIn.scss'
import {auth,signInWithGoogle} from '../../firebase/Firebase'

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit=async event=>{
        event.preventDefault();
        const {email,password}=this.state; 
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''})
        }
        catch(error){
            console.log(error)
        }
        this.setState({emial:'', password:''})
    }


    handleChange=(event)=>{
        const{value,name}=event.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} required
                    handleChange={this.handleChange} label='email'></FormInput>
                    <FormInput name="password" type="password" value={this.state.password} required
                    handleChange={this.handleChange} label='password'></FormInput>
                    <div className='buttons'>
                    <CustomButton type="submit"> Sign-In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Google Sign-In</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}





export default SignIn
