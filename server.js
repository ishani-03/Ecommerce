/*
we are using the library express which makes it really easy for us to write a node back end code in server 
*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path= require('path') // allows to dynamically build
const enforce = require('express-sslify')


if(process.env.NODE_ENV !== 'production') require('dotenv').config()


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) /* this returns us a function which takes argument as the 1st parameter where the 
argument is the stripe secret key */ 
/* "dotenv" written in line 11 helps to find the .env file from the root folder and add it to the process environment */

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(enforce.HTTPS({ trustProtoHeader : true }))
app.use(cors())

if(process.env.NODE_ENV === 'production')
{
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*' , function( req, res){
        res.sendFile(path.join(__dirname , 'client/build' , 'index.html'))
    })

}

app.listen(port, error =>{
    if(error) throw error
    console.log('Server running on port:' + port)
})

app.get('/service-worker.js',(req, res) =>{
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})


app.post('/payment' , (req, res) =>{ /* req object holds all of the details and info and data related to 
    the request being made from the front end */
    const body ={
        source: req.body.token.id,
        amount: req.body.amount ,
        currency: 'usd' //we can choose any preferred currency
    }

    stripe.charges.create(body , (stripeErr , stripeRes ) =>{
        if(stripeErr){
            res.status(500).send({ error: stripeErr})
        } else{
            res.status(200).send({ success: stripeRes})
        }
    } )
}) 