import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export async function signUp(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up successfully!");
  } catch (error) {
    console.error("Error signing up: ", error);
  }
}

export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in successfully!");
  } catch (error) {
    console.error("Error signing in: ", error);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    console.log('User signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
