// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from 'firebase/auth';

export const user = writable<User | null | undefined>(undefined);

if (browser) {
	// Dynamically import auth from firebase.ts
	import('$lib/firebase').then(({ auth }) => {
		if (auth) {
			auth.onAuthStateChanged((currentUser) => {
				user.set(currentUser);
			});
		}
	});
} else {
	user.set(null);
}
