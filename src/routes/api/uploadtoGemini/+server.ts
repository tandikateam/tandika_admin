//@ts-nocheck
import { writeFile, unlink } from 'fs/promises';
import { generateSchema } from '$lib/siteBuilder/geminiUtils';
import { join } from 'path';
import { tmpdir } from 'os';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	console.log('POST request received');
	try {
		const formData = await request.formData();
		console.log('Form data parsed');

		const file = formData.get('file');
		const ctas = formData.get('ctas');

		if (!file) {
			console.warn('No file received');
			return json({ success: false, error: 'No file uploaded' }, { status: 400 });
		}

		console.log(`File received: ${file.name}`);

		const tempFilePath = join(tmpdir(), file.name);
		console.log(`Temporary file path: ${tempFilePath}`);

		try {
			const fileBuffer = Buffer.from(await file.arrayBuffer());
			await writeFile(tempFilePath, fileBuffer);
			console.log('File written to temporary location');

			let result = await generateSchema(tempFilePath, ctas);
			console.log('Schema generated');

			return json(result);
		} catch (error) {
			console.error('Error processing file:', error);
			return json({ success: false, error: error.message }, { status: 500 });
		} finally {
			try {
				await unlink(tempFilePath);
				console.log('Temporary file removed');
			} catch (unlinkError) {
				console.error('Error removing temporary file:', unlinkError);
			}
		}
	} catch (error) {
		console.error('Unexpected error:', error);
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
}
