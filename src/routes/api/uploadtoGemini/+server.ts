//@ts-nocheck
import { json } from '@sveltejs/kit';
import { generateSchema } from '$lib/siteBuilder/geminiUtils';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const TIMEOUT = 120000; // 60 seconds

export async function POST({ request }) {
    console.log('POST request received');
    
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), TIMEOUT)
    );
    
    let tempFilePath;

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const ctas = formData.get('ctas');

        if (!file) {
            return json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        tempFilePath = join(tmpdir(), file.name);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await writeFile(tempFilePath, fileBuffer);

        const schemaPromise = generateSchema(tempFilePath, ctas);
        const result = await Promise.race([schemaPromise, timeoutPromise]);

        return json(result);
    } catch (error) {
        console.error('Error:', error);
        return json(
            { success: false, error: error.message }, 
            { status: error.message === 'Operation timed out' ? 504 : 500 }
        );
    } finally {
        if (tempFilePath) {
            try {
                await unlink(tempFilePath);
            } catch (unlinkError) {
                console.error('Error removing temporary file:', unlinkError);
            }
        }
    }
}