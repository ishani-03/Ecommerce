import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config=
    {
        apiKey: "AIzaSyCeVD-MmzdWxuJyOVRAdUfkAfFmwqktYWc",
        authDomain: "crown-db-f5972.firebaseapp.com",
        databaseURL: "https://crown-db-f5972.firebaseio.com",
        projectId: "crown-db-f5972",
        storageBucket: "crown-db-f5972.appspot.com",
        messagingSenderId: "371200856026",
        appId: "1:371200856026:web:60e0dcbf4d61f933cabae3",
        measurementId: "G-VS5YDCRDL2"
      };

export const createUserProfileDocument = async(userAuth,additionalData)=>{
  if(!userAuth) return;


  const userRef= firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()
  // console.log(snapShot)

  if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log("Error creating user:" , error.message);
    }
  }
  return userRef;
  // console.log(firestore.doc('users/12s3fwfqf'))
}



firebase.initializeApp(config)

//To add shop data in the firebase back-end
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)
  // console.log(objectsToAdd)

  const batch= firestore.batch();
  objectsToAdd.forEach(obj  => {
    const newDocRef = collectionRef.doc(obj.title);
        batch.set(newDocRef, obj)
  });
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) =>{
  const transformedCollection = collections.docs.map(doc =>{
    const { title, items} =doc.data();

    return{
      routeName: encodeURI(title.toLowerCase()),
      id : doc.id,
      title,
      items
    }
  })
  console.log(transformedCollection)

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {} )

 
}

export const getCurrentUser = () =>{
  return new Promise((resolve,reject) => {
    const unsubscribe =auth.onAuthStateChanged(userAuth =>{
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth= firebase.auth()
export const firestore= firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(googleProvider);

export default firebase;


