import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const user = await request.json();

	if (user) {
		cookies.set('authUser', JSON.stringify(user), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});
		return json({ success: true });
	}

	return json({ success: false, message: 'Invalid user data' }, { status: 400 });
};
