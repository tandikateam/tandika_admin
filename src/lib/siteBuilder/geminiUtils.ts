//@ts-nocheck
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { FunctionDeclarationSchemaType } from '@google/generative-ai';
import { json } from '@sveltejs/kit';

function extractJSObject(responseString) {
	//
}
const apiKey = 'AIzaSyCk1EMtXWt7aWDc5Izj-w6p7YTOyeHeSVU';
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

export async function uploadToGemini(path, mimeType) {
	const uploadResult = await fileManager.uploadFile(path, {
		mimeType,
		displayName: path
	});
	const file = uploadResult.file;
	console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
	return file;
}

async function waitForFilesActive(files) {
	console.log('Waiting for file processing...');
	for (const name of files.map((file) => file.name)) {
		let file = await fileManager.getFile(name);
		while (file.state === 'PROCESSING') {
			process.stdout.write('.');
			await new Promise((resolve) => setTimeout(resolve, 10_000));
			file = await fileManager.getFile(name);
		}
		if (file.state !== 'ACTIVE') {
			throw Error(`File ${file.name} failed to process`);
		}
	}
	console.log('...all files ready\n');
}

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro'
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 15000,
	responseMimeType: 'application/json'
};

export async function generateSchema(filePath, ctas) {
	const files = [await uploadToGemini(filePath, 'application/pdf')];
	await waitForFilesActive(files);

	let prompt = `
    Please analyze the contents of this pitch deck and return this JSON schema
    for a landing page based on the information provided. This schema will be used
    to generate a landing page for the startup.

    Key instructions:
    1. If there are no testimonials in the pitch deck, generate 4 placeholder testimonials
       that reflect the company's mission and target audience (customers); use names associated with the country of the pitch deck if possible.
    2. Include at least 5 FAQs based on the information in the deck, but avoid
       mentioning specific monetary amounts or transaction fees. 
    3. The navigationItems should not exceed 5, prioritize what a customer would be interested in. The sections
    should match the keys in the base schema, e.g. solution, productFeatures, faqs, team, contact
    4. The FAQs should focus on the product, process, and benefits for users: Speculate based on what's
     in the pitch deck; but just a little.
    5. If specific information is not available in the pitch deck, use reasonable
       placeholder text based on the overall context of the startup. For image URLs,
       use 'null' as a placeholder.
    6. If the pitch deck contains more information than the schema allows, prioritize
       the most impactful and customer-facing details.
    7. Ensure that the information across different sections of the schema is consistent
       in tone, style, and content.
    8. Maintain a professional yet engaging tone throughout the schema, make it simple to understand, appropriate
       for a startup's landing page.
    9. Get an acceptable primary and secondary color HEX code from the startup's presentation; if there's a
    logo or anyother indicative elements.
    10. Be a little creative on the titles and subtitles; something engaging yet simple that a readers would love to read.
    11. Keep the team members bios a bit short but precise; just their position in the company and bit about them, if its there.
    12. If the startup has little or no traction or very early stage, ignore it and return an empty array in tractions. The traction
    should  evoke something like: Our Journey So Far. Ideally a user should relate to the growth of the startup in this section.
    13. Ensure that the JS you return is a valid JSON object.
    14. Get the full startup name.
    15. Titles should be engaging, creative and capture the attention of the site visitor, same applies to the subtitles for the different
    sections; but based on what the startup is offering, it's mission, solution and vision. 
    16. Make problemStats a collection of any problems having statistics; 
    If there is a figure in the problem statements -  separate the number in statistic and the statistic description;
     for example if the problem is 3 out every 10 girls do not have sanitary pads, do something like this in that section
    { stat: '3/10', stat_description: 'Girls do not have sanitary pads'}
     Give a minimum of 3 statistics - feel free to find any relevant statistics to the problem, add the source in brackets.
    17. When generating your response, please replace all apostrophes (') with the escaped version (\'). This applies to any text content, 
    including within quotes or code snippets. For example, instead of writing "it's", write "it\'s". 
    This rule should be applied consistently throughout your entire response, regardless of the context 
    in which the apostrophe appears.
    18. In the summary section, return a short summary of the startup; context on what the startup does, the problems they solve, etc.
    19. In the hero section, the ctas type can strictly be any of the following actions: contact, pre_order, wait_list, demo_video, request_demo, newsletter
    20. For the channels object: extract ALL communication channels that may be in the pitch deck - emails, social media, phone numbers etc. 
    and add them to the channels object array: set the option for channel as any of the following - 
    Phone, WhatsApp, LinkedIn, Twitter_X, Facebook, Instagram, Email etc.
     and all set to active as true for all: Strictly use URLs for socialmedia links.
    21. For the mainContact, set the channels to the CEO's contact information if available or any other relevant
     contacts; use either phone numbers or emails only for mainContact.
    22. For phone numbers, always format phone numbers as: [country code][number]
  
    The schema should strictly follow this structure:
    {
    startupName: string,
    primaryColor: HEXColor,
    primaryColorForeground: HEXColor,
    secondaryColor: HEXColor,
    secondaryColorForeground: HEXColor,
        navigationItems: [{title: string, section: string, active: boolean}],
        hero: {
            headline: string,
            tagline: string,
            ctas: [{
            title: string,
            subtitle: string,
            type: string,
            buttonText: string,
            content: string
        }],
            heroImageURL: string
        },
        problem:{
            title: string,
            subtitle: string,
            problems:[{
                title: string,
                description: string,
                imageURL: string
        }]},
        problemStats: [
            {
            stat: percentage or number,
            stat_description: string,
            }
        ],
        solution: {
            title: string,
            subtitle: string,
            solutions: [{
                title: string,
                description: string,
                pricing: string,
                imageURL: string
            }]
        },
        traction: {
            title: string,
            subtitle: string,
            tractions:  [{
                description: string,
                statistic: string
            }],
            },
        productFeatures: {
            title: string,
            subtitle: string,
            features: [{
                title: string,
                description: string,
                icon: string
            }]
        },
        howItWorks: {
            title: string,
            subtitle: string,
            steps: [{
                stepNumber: number,
                title: string,
                description: string,
                imageURL: string
            }]
        },
        useCases: {
         title: string,
            subtitle: string,
            cases: [{
                title: string,
                description: string,
                imageURL: string
            }]
        },
        testimonials: {
            title: string,
            subtitle: string,
            quotes: [{
                quote: string,
                author: string,
                imageURL: string
            }]
        },
        faqs: {
            title: string,
            subtitle: string,
            faqs: [{
                question: string,
                answer: string
            }]
        },
        team: {
            title: string,
            subtitle: string,
            members: [{
                name: string,
                bio: string,
                contacts:  channels: [{
            channel: string, 
			value: string,
            }],
                imageURL: string,
                position: string
            }]
        },
        partners: [{partner: string, imageURL: string}],
       
        mainContact: {
            title: string,
            subtitle: string,
            channels: [{
            channel: string, 
			value: string,
            }]
        },
        
        footer: {
            locationInfo: string,
            copyright: string,
        },
        summary: string,
         
        channels: [{
            channel: string, 
			value: string,
			responseRate: 0,
			active: true
            }]

    }
    Fill in the schema with appropriate information from the pitch deck.
    Provide the complete schema as a valid JavaScript object,
    Generate a JavaScript schema for the startup's landing page based on the
        provided pitch deck and the default schema.
        Here are Call to Actions you can add to the hero section: ${JSON.stringify(ctas)},
        ensuring they align with the startup's goals as presented in the pitch deck.
        .

    `;

	const chatSession = model.startChat({
		generationConfig,
		// safetySettings: Adjust safety settings
		// See https://ai.google.dev/gemini-api/docs/safety-settings
		history: [
			{
				role: 'user',
				parts: [
					{
						fileData: {
							mimeType: files[0].mimeType,
							fileUri: files[0].uri
						}
					}
				]
			}
		]
	});

	const result = await chatSession.sendMessage(prompt);
	console.log(result.response.text());
	return result.response.text();
}
