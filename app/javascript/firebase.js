import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, where, getDocs, serverTimestamp, addDoc } from "firebase/firestore"

const FIREBASE_COMMENTS_KEY = "comments"
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAjxPPzmJ_Kt6fB1JlsgprX8yvzxtqIImI",
  authDomain: "movie-library-b986c.firebaseapp.com",
  projectId: "movie-library-b986c",
  storageBucket: "movie-library-b986c.appspot.com",
  messagingSenderId: "211741629824",
  appId: "1:211741629824:web:c705ce059960600dd13565"
};

const firebase = initializeApp(FIREBASE_CONFIG)

export const firestore = getFirestore(firebase)

export const commentsCollection = collection(firestore, FIREBASE_COMMENTS_KEY)

export const fetchComments = async ({ movieId }) => {
  const q = query(commentsCollection, where("movie_id", "==", movieId));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
}


export const createComment = async ({ movieId, name = 'Anonymous author', message }) => {
  if (!message || message.trim() === '' || (!movieId && movieId === 0)) {
    return
  }

  await addDoc(commentsCollection, {
    name,
    movie_id: movieId,
    message,
    date: serverTimestamp()
  });
}

export default firebase
