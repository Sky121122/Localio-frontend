import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";

import { auth } from "./firebase";

export const registerUser = async (name, email, password) => {

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

       await updateProfile(userCredential.user, {
        displayName: name,
    });

    await sendEmailVerification(userCredential.user);

    return userCredential.user;
};


export const loginUser = async (email, password) => {

    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    if (!userCredential.user.emailVerified) {

        await signOut(auth);

        throw new Error("Please verify your email before logging in.");

    }

    return userCredential.user;
};

export const logoutUser = () => signOut(auth);

export const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};


export const changePassword = async (
    currentPassword,
    newPassword
) => {

    const auth = getAuth();

    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
    );

    // Re-authenticate
    await reauthenticateWithCredential(
        user,
        credential
    );

    // Update password
    await updatePassword(
        user,
        newPassword
    );

};