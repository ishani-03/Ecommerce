import React from 'react'
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './ErrorBoundaryStyles'

class ErrorBoundary extends React.Component{
    constructor(){
        super()
        this.state={
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error)/* This static method catches any error that gets thrown in any of the children 
    of this error boundary component*/
    {
        //process the error
        return { hasErrored: true}
    }

    componentDidCatch(error, info){
        console.log(error)
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/qIufhof.png' />
                    <ErrorImageText>Sorry, This page is not available at the moment.</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children 
    }
}


export default ErrorBoundary