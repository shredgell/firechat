// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';

// Store for the authenticated user
export const user = writable<User | null>(null);

// Store to track if authentication has been initialized
export const authInitialized = writable<boolean>(false);

if (browser && auth) {
	// Listen for authentication state changes without assigning to a variable
	auth.onAuthStateChanged((currentUser) => {
		user.set(currentUser);
		authInitialized.set(true); // Set initialized to true after auth state is determined
	});
}
