//@ts-nocheck
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '$lib/firebaseConfig.js';
import { authUser } from '$lib/stores/persistedAuthStore';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = ({ cookies }) => {
	const authUserCookie = cookies.get('authUser');
	let user = null;

	if (authUserCookie) {
		try {
			user = JSON.parse(authUserCookie);
			// console.log(user);
			if (!user) {
				console.error('Invalid user data in cookie');
				cookies.delete('authUser', { path: '/' });
				user = null;
				throw redirect(302, '/login');
			}
		} catch (error) {
			console.error('Error parsing authUser cookie:', error);
			cookies.delete('authUser', { path: '/' });
		}
	} else {
		throw redirect(302, '/login');
	}

	return {
		user
	};
};
