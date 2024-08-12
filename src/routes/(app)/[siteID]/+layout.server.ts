//read current site id

import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebaseConfig';
import { authUser } from '$lib/stores/persistedAuthStore.js';
import { get } from 'svelte/store';
import { getCorrCount, readUser } from '$lib/firebaseUtils.js';

async function readSite(id: string) {
	const docRef = doc(db, 'sites', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log('Document data:', docSnap.data());
		return docSnap.data();
	} else {
		// docSnap.data() will be undefined in this case
		// console.log('No such document!');
		return null;
	}
}

async function getUserSites(email: string) {
	try {
		let userData = await readUser(email);
		return userData;
	} catch (error) {
		// console.error(error);
	}
}

//Active Correspondences

export let load = async ({ params, parent, depends }) => {
	depends('app:layout');
	// Get the parent data
	const parentData = await parent();
	// Now you can use the parent data
	// console.log(parentData.user.email);
	let userSites = await getUserSites(parentData.user.email);
	let siteData = await readSite(params.siteID);
	let corrCount = await getCorrCount(params.siteID);
	return {
		siteID: params.siteID, //site ID
		siteData: siteData, //site data
		userSites: userSites?.sites, //sites created by user
		corrCount
	};
};
