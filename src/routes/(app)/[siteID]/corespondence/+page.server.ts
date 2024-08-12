import { getCorrespondence } from '$lib/firebaseUtils.js';

export let load = async ({ url, params, parent }) => {
	// const parentData = await parent();
	let viewed = url.searchParams.get('viewed') || null;
	let c = await getCorrespondence(viewed, params.siteID);

	return {
		correspondence: JSON.parse(JSON.stringify(c))
	};
};
