//@ts-nocheck
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	updatePhoneNumber
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '$lib/firebaseConfig';
import {
	collection,
	addDoc,
	doc,
	setDoc,
	getDocs,
	updateDoc,
	getDoc,
	arrayRemove,
	query,
	where,
	arrayUnion,
	getCountFromServer,
	orderBy,
	limit
} from 'firebase/firestore';
import { authUser } from '$lib/stores/persistedAuthStore';

//Register a New User
export async function register(email, password) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log(userCredential);
		return userCredential.user;
	} catch (error) {
		console.error('Registration error:', error.message);
		throw error;
	}
}

//Update User Profile
export async function updateUser(displayName, phoneNumber, photoURL) {
	// console.log(displayName, phoneNumber, photoURL);
	// console.log(auth.currentUser);
	await updateProfile(auth.currentUser, {
		displayName,
		photoURL
	})
		.then(() => {
			return 'success';
		})
		.catch((error) => {
			throw error;
		});
}

//Save User
export async function saveUser(displayName, email, phone, uid) {
	try {
		await setDoc(doc(db, 'users', email), {
			displayName,
			email,
			sites: [],
			phone: phone,
			uid
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//Append User sites
export async function userSites(type = 'append', email, startup_name, id) {
	const userRef = doc(db, 'users', email);
	if (type == 'append') {
		await updateDoc(userRef, {
			sites: arrayUnion({ startup_name, site_id: id })
		});
	}
}

//Upload
export async function uploadFile(file, route) {
	// Create a unique filename (you can modify this as needed)
	const filename = `${Date.now()}_${file.name}`;
	// Create a reference to the location where we want to upload the file
	const storageRef = ref(storage, `${route}/${filename}`);
	try {
		// Upload the file
		const snapshot = await uploadBytes(storageRef, file);
		// Get the download URL
		const downloadURL = await getDownloadURL(snapshot.ref);
		// Return the download URL
		return downloadURL;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw error;
	}
}

//Save Site
export async function saveSite(site) {
	//
	try {
		const docRef = await addDoc(collection(db, 'sites'), {
			...site
		});
		return docRef.id;
	} catch (error) {
		return error;
	}
}

//Read User
export async function readUser(email) {
	const docRef = doc(db, 'users', email);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log('Document data:', docSnap.data());
		return docSnap.data();
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
		return null;
	}
}

//Update Site
export async function updateDocument(collectionName, documentId, updatedData) {
	try {
		const docRef = doc(db, collectionName, documentId);
		await setDoc(
			docRef,
			{
				...updatedData
			},
			{ merge: true }
		);
		console.log('Document updated successfully!');
	} catch (error) {
		console.error('Error updating document: ', error);
	}
}

//Check subdomain availability
export async function checkAvailability(subdomain) {
	try {
		let sites = [];
		const sitesRef = collection(db, 'sites');
		const q = query(sitesRef, where('subdomain', '==', subdomain));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			sites = [...sites, doc.data()];
		});
		if (sites.length > 0) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		console.error(error);
	}
}

export async function updateChannelStatus(documentId, objectToUpdate, newBooleanValue) {
	const docRef = doc(db, 'sites', documentId);
	try {
		// Create a new object with the updated boolean value
		const updatedObject = { ...objectToUpdate, active: newBooleanValue };
		// Remove original document
		await updateDoc(docRef, {
			channels: arrayRemove(objectToUpdate)
		});
		//Add the new updated object
		await updateDoc(docRef, {
			channels: arrayUnion(updatedObject)
		});
		console.log('Object updated successfully');
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function addChannel(documentId, objectsToAdd) {
	const docRef = doc(db, 'sites', documentId);
	try {
		//Add the new updated object
		await updateDoc(docRef, {
			channels: arrayUnion(...objectsToAdd)
		});
		console.log('Object updated successfully');
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function removeChannel(documentId, objectToAdd) {
	const docRef = doc(db, 'sites', documentId);
	try {
		//Add the new updated object
		await updateDoc(docRef, {
			channels: arrayRemove(objectToAdd)
		});
		console.log('Object updated successfully');
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//Get Correspondence
export async function getCorrespondence(viewed, siteID) {
	try {
		let q;

		if (!viewed) {
			q = query(
				collection(db, 'correspondence'),
				where('siteID', '==', siteID),
				orderBy('createdAt'),
				limit(20)
			);
		} else {
			q = query(
				collection(db, 'correspondence'),
				where('siteID', '==', siteID),
				where('viewed', '==', viewed),
				orderBy('createdAt'),
				limit(20)
			);
		}

		let corr = [];
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			//   console.log(doc.id, " => ", doc.data());
			corr = [...corr, { ...doc.data(), id: doc.id }];
		});
		return corr;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//Get count
export async function getCorrCount(siteID) {
	try {
		const coll = collection(db, 'correspondence');
		const q = query(coll, where('viewed', '==', false), where('siteID', '==', siteID));
		const snapshot = await getCountFromServer(q);
		// console.log('count: ', snapshot.data().count);
		return snapshot.data().count;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//Toggle Correspondence status
export async function toggleViewed(id, viewed) {
	try {
		const corRef = doc(db, 'correspondence', id);
		await updateDoc(corRef, {
			viewed: viewed
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}