import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore=firebase.firestore();

firestore.collection('users').doc('YrhtgXkb7dBfyxVRRpr6').collection('cartItems').doc('9EcbUi6z9noHaIGDpN5Q')
// firestore.doc('/users/YrhtgXkb7dBfyxVRRpr6/cartItems/9EcbUi6z9noHaIGDpN5Q')
// firestore.collection('/users/YrhtgXkb7dBfyxVRRpr6/cartItems')
//the above both lines are equivalent to the dirst line. These two lines are anther way of writing the code.


