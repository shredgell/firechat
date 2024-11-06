// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';

export const user = writable<User | null>(null);

if (browser && auth) {
	// Set the initial user
	user.set(auth.currentUser);

	// Listen for authentication state changes
	auth.onAuthStateChanged((currentUser) => {
		user.set(currentUser);
	});
}
