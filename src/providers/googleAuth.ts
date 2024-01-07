import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signInAnonymously,
  UserCredential,
} from "firebase/auth";

export const signInWithgoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  setPersistence(auth, browserLocalPersistence);

  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
  } catch (error: any) {
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
};

export const signOut = async () => {
  const auth = getAuth();
  try {
    await auth.signOut();
    console.log("SIGNED OUT");
  } catch (error) {
    console.log("error", error);
  }
};
