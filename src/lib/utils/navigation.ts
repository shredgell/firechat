import { goto } from '$app/navigation';
import type { User } from 'firebase/auth';

export const redirectIfAuthenticated = (user: User | null) => {
	if (user) {
		goto('/dashboard');
	}
};

export const redirectIfNotAuthenticated = (user: User | null) => {
	if (!user) {
		goto('/login');
	}
};
