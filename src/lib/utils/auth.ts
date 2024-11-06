// src/lib/utils/auth.ts
import { auth, googleProvider } from '$lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

export const signInWithGoogle = async () => {
	try {
		await signInWithPopup(auth, googleProvider);
	} catch (error) {
		console.error('Google Sign-In Error:', error);
	}
};

export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Logout Error:', error);
	}
};
