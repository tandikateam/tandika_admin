//@ts-nocheck
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';
import { authUser } from '$lib/stores/persistedAuthStore';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const authUserCookie = cookies.get('authUser');

	if (authUserCookie) {
		throw redirect(302, '/new/dashboard');
	} else {
		return;
	}
};
