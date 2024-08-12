<script>
	// @ts-nocheck

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import Index from '$lib/templates/01/Index.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { CornerDownLeft, Mic, MousePointerClick, Paperclip, Send } from 'lucide-svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { resetMode, setMode, mode } from 'mode-watcher';
	import { readableColor } from 'color2k';
	import { writable } from 'svelte/store';

	let editing = false;
	let prompting = false;
	let updating = false;
	let activeSection = null;
	let activeSectionImage = null;
	let updatePrompt = '';

	export let data;
	// $: console.log(data);
	let siteData = JSON.parse(JSON.stringify(data.siteData || {}));
	$: console.log(data);

	//Builder
	import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
	import { updateDocument } from '$lib/firebaseUtils';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-pro'
	});
	const generationConfig = {
		temperature: 0.65,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 8192,
		responseMimeType: 'application/json'
	};

	async function updateSection(section) {
		const chatSession = model.startChat({
			generationConfig,
			history: [
				{
					role: 'user',
					parts: [
						{
							text: `
							Startup Context:
Summary of the startup you're adjusting for: ${siteData.summary}

Input Object:
JS Object representing the ${section} section of the startup's landing page schema:
${siteData[section]}

Update Instructions:
${updatePrompt}

VERY IMPORTANT:
CRITICAL: ONLY MODIFY VALUES, NOT KEYS OR STRUCTURE

Update ONLY the VALUES of the provided JS object properties based on the given instructions.
DO NOT change any object keys, add new properties, or alter the object's structure in any way.
The object's schema must remain identical - only the values should be updated.
Return the entire updated object in your response, maintaining its original structure.
All string values should be regular text, not markdown.
Do not modify any URLs present in the object values.
Replace all apostrophes (') with the escaped version (\') in your response.
Example of Correct Update:
Original:
{
    "heroImageURL": "null",
    "headline": "Making Seamless Mobility a Reality in Africa",
    "tagline": "Providing reliable and affordable e-ticketing solutions for buses, trains & ferries across Africa.",
    "ctas": [
        {
            "type": "contact",
            "title": "Get in Touch",
            "buttonText": "Contact Us",
            "content": "",
            "subtitle": "Have any questions or need assistance?"
        }
    ]
}
Update Prompt: Change Mobility to Transport
Correct Output:
{
    "heroImageURL": "null",
    "headline": "Making Seamless Transport a Reality in Africa",
    "tagline": "Providing reliable and affordable e-ticketing solutions for buses, trains & ferries across Africa.",
    "ctas": [
        {
            "type": "contact",
            "title": "Get in Touch",
            "buttonText": "Contact Us",
            "content": "",
            "subtitle": "Have any questions or need assistance?"
        }
    ]
}
Example Wrong (Incorrect) Output
{
    "heroImageURL": "newImageURL",
	backgroundImage: 'https://example.com/image.png' //Added new property - Incorrect
    "headline": "Transforming Transportation Across Africa",
    "tagline": "Reliable and affordable e-ticketing solutions for all your transport needs.",
    "cta": {  // Structure change - Incorrect
        "type": "contact",
        "title": "Get in Touch",
        "buttonText": "Reach Out",
        "content": "",
        "subtitle": "Have any questions or need assistance?"
    }
}

Remember:

Do not change keys or structure.
Only update the values.



							`
						}
					]
				}
			]
		});

		const result = await chatSession.sendMessage(
			`

1. Startup Context:
   Summary of the startup you're adjusting for: ${siteData.summary}

2. Input Object:
   JS Object representing the "${section}" section of the startup's landing page schema:
   ${JSON.stringify(siteData[section], null, 2)}

3. Update Instructions:
   ${updatePrompt}

			`
		);
		// console.log(result.response.text(), 'TEXT RESPONSE');
		// console.log(schema[section], JSON.parse(result.response.text()));
		return JSON.parse(result.response.text());
	}

	function isValidObject(obj) {
		// Check if it's not null and is of type 'object'
		if (obj === null || typeof obj !== 'object') {
			return false;
		}

		// Check if it's not an array
		if (Array.isArray(obj)) {
			return false;
		}

		// Check if it's not a Date object
		if (obj instanceof Date) {
			return false;
		}

		// Check if it's not a function
		if (typeof obj === 'function') {
			return false;
		}

		// Check if it has at least one property
		if (Object.keys(obj).length === 0) {
			return false;
		}

		// If all checks pass, return true
		return true;
	}
</script>

<svelte:head>
	<title>Builder | {siteData?.startup_name || ''} | Tandika</title>
</svelte:head>

<!-- <p class="p-4 text-5xl">
	{JSON.stringify(schema) === JSON.stringify(data.siteData)}
</p> -->

{#if !siteData}
	<div class="flex min-h-[80vh] flex-col items-center justify-center gap-2">
		<p>No site found</p>
		<Button>Create a new site</Button>
	</div>
{:else}
	<div class="max-w-screen flex flex-row gap-1">
		<div class="basis-9/12">
			<Index bind:activeSection bind:editing bind:siteData />
		</div>

		<div class="min-h-[80vh] basis-3/12 border-l">
			<div class="flex items-center justify-between px-3">
				<div class="flex items-center space-x-2 py-5">
					<Switch
						id="edit-mode"
						bind:checked={editing}
						onCheckedChange={() => {
							activeSection = null;
						}}
					/>
					<Label for="edit-mode">Edit Mode</Label>
				</div>
				<Button
					disabled={JSON.stringify(siteData) === JSON.stringify(data.siteData) ||
						updating ||
						prompting}
					class=""
					on:click={async () => {
						updating = true;
						toast.loading('Updating..', { description: 'Please wait while we save your changes' });
						//Update Site

						updateDocument('sites', data.siteID, siteData)
							.then(() => {
								//
								invalidate('app:layout').then(() => {
									toast.dismiss();
									toast.success('Updated', { description: 'Your changes were saved succesfully!' });
									siteData = JSON.parse(JSON.stringify(data.siteData));
									updating = false;
								});
							})
							.catch((e) => {
								//
								toast.dismiss();
								toast.error('Error', { description: 'Something went wrong' });
								updating = false;

								console.error('Error updating site!', e);
							});
					}}
				>
					{#if updating}
						Updating...
					{:else}
						Update
					{/if}
				</Button>
			</div>
			<Separator />

			{#if editing}
				<div class="py-4" class:dark={$mode == 'dark'}>
					<ColorPicker
						label="Select Color Theme"
						bind:hex={siteData.primaryColor}
						on:input={() => {
							// activeSection = 'primaryColor';
							siteData.primaryColorForeground = readableColor(siteData.primaryColor);
						}}
					/>
				</div>
				<Separator />

				{#if activeSection}
					<div class="">
						<div class="">
							<div
								class="relative overflow-hidden rounded-none border-b"
								data-x-chunk-name="dashboard-03-chunk-1"
								data-x-chunk-description="A div for sending a message to an AI chatbot. The div has a textarea and buttons to upload files and record audio."
							>
								<Label for="message" class="sr-only">Update Instructions</Label>
								<Textarea
									disabled={prompting}
									bind:value={updatePrompt}
									id="message"
									rows="10"
									placeholder="Type your update Instructions here..."
									class="h-full min-h-12 resize-none border-0 p-3 shadow-none 
									focus-visible:ring-0"
								/>
								<div class="flex items-center p-3 pt-0">
									<Button
										disabled={prompting}
										size="sm"
										class="ml-auto gap-1.5"
										on:click={async () => {
											prompting = true;
											let js = await updateSection(activeSection);
											/////TOD0: Validate if valid js object before updating.
											if (isValidObject(js)) {
												siteData[activeSection] = js;
											} else {
												toast.error('Error', {
													description: 'Something went wrong while trying to update your site'
												});
											}
											updatePrompt = '';
											prompting = false;
										}}
									>
										{#if prompting}
											Loading....
										{:else}
											Confirm
											<Send class="size-3.5" />
										{/if}
									</Button>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div class="flex min-h-44 flex-col items-center justify-center gap-2 p-3">
						<div
							class="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
						>
							<MousePointerClick class="size-8" />
						</div>
						<p class="text-center">Please select a section to edit</p>
					</div>
					<Separator />
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	/* .dark {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-text-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	} */
</style>
