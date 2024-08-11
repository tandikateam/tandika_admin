import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';

interface AuthUser {
	displayName: string;
	email: string;
	phoneNumber: string;
	uid: string;
	photoURL: URL;
}

function createPersistentAuthStore() {
	const { subscribe, set } = writable<AuthUser | undefined>(undefined);

	if (browser) {
		page.subscribe(($page) => {
			if ($page?.data?.user) {
				set($page?.data?.user);
			}
		});
	}

	return {
		subscribe,
		set: async (user: AuthUser | undefined) => {
			set(user);
			if (browser) {
				try {
					console.log('Sending user data:', user); // Add this line
					const response = await fetch('/api/setAuthUser', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || 'Failed to set auth user');
					}
				} catch (error) {
					console.error('Error setting auth user:', error);
					throw error;
				}
			}
		},
		clear: async () => {
			set(undefined);
			if (browser) {
				try {
					const response = await fetch('/api/clearAuthUser', { method: 'POST' });
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || 'Failed to clear auth user');
					}
				} catch (error) {
					console.error('Error clearing auth user:', error);
					throw error;
				}
			}
		}
	};
}

export const authUser = createPersistentAuthStore();
