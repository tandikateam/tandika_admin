<script lang="ts">
	// @ts-nocheck
	import { Separator } from '$lib/components/ui/separator';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { saveSite, userSites } from '$lib/firebaseUtils';
	const dispatch = createEventDispatcher();

	let step = 1;

	let site = {
		pitchdeck_URL_firebase: '',
		pitchdeck_URL_gemini: '', //Expires in 24 hours
		startup_name: '',
		actions: ['contact'], //Get Primary and Secondary Action from action index 1, 2
		schema: {},
		owner: $authUser.uid,
		visits: [],
		socials: []
	};

	//Step 1
	let _actions = [
		{ action: 'Contact You', icon: Send, id: 'contact' }, //Open contact form
		{ action: 'Pre-Order', icon: PackageCheck, id: 'pre_order' }, //Open PreOrder form
		{ action: 'Join a Waitlist', icon: FileClock, id: 'wait_list' }, //Open Waitlist Form
		{ action: 'Watch a Demo Video', icon: SquarePlay, id: 'demo_video' }, //Show Demo Video
		{ action: 'Request a Demo', icon: TabletSmartphone, id: 'request_demo' }, //Open Request Demo Form
		{ action: 'Join Newsletter', icon: Newspaper, id: 'newsletter' } //Open Newsletter Form
	];

	//Step 2
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		ArrowLeft,
		ArrowRight,
		CloudUpload,
		FileUp,
		X,
		Send,
		PackageCheck,
		FileClock,
		SquarePlay,
		TabletSmartphone,
		Newspaper
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { storage } from '$lib/firebaseConfig';
	import { uploadFile } from '$lib/firebaseUtils';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import Loader from '$lib/customComponents/Loader.svelte';
	import { authUser } from '$lib/stores/persistedAuthStore';
	import { schema } from './utils';
	import { uid } from 'uid';
	let file: { name: any } | null;
	let fileInput: HTMLInputElement;
	function handleFileSelect(event) {
		file = event.target.files[0];
		// console.log(file);
	}

	function cleanString(str) {
		// Convert to lowercase
		str = str.toLowerCase();

		// Remove symbols and spaces
		str = str.replace(/[^a-z0-9]/g, '');

		// Trim the string
		str = str.trim();

		return str;
	}

	let duration = 500;
	let uploading = false;

	let fileStep = { s: 'Uploading your file.', t: 'loading' };

	async function handleSubmit() {
		uploading = true;
		step = 3;
		if (!file) return;
		let fileURL = await uploadFile(file, `pitchdecks`);
		site.pitchdeck_URL_firebase = fileURL;
		let error = null;
		let result = null;
		const formData = new FormData();
		formData.append('file', file);
		formData.append('ctas', site.actions);

		try {
			fileStep = { s: 'Analysing your Pitchdeck.', t: 'loading' };

			const response = await fetch('/api/uploadtoGemini', {
				method: 'POST',
				body: formData
			});
			const data = await response.json();
			if (data) {
				result = data;
				site.schema = JSON.parse(result) || null;
				let _schema = { ...site.schema }; //Deconstruct schema

				fileStep = { s: 'Saving your site.', t: 'loading' };
				// Break it all down!
				let docId = await saveSite({
					..._schema,
					pitchdeck_URL_firebase: site.pitchdeck_URL_firebase,
					startup_name: _schema.startupName,
					actions: ['contact'],
					active: true,
					startup_logo: null,
					owner: $authUser.uid,
					subdomain: cleanString(_schema.startupName) + uid(5),
					visits: [],
					socials: [],
					contacts: []
				});

				//Update User sites array
				await userSites('append', $authUser?.email, _schema.startupName, docId);

				fileStep = { s: 'Done.', t: 'success' };
				//Close Drawer and redirect!
				dispatch('finish', {
					id: docId
				});
				toast.success('Success!', {
					description: 'Your new Tandika site was created successfully'
				});
				if (!result) {
					fileStep = { s: 'Something went wrong.', t: 'error' };
					toast.error('Error', { description: 'There was an error analyzing your Pitch Deck' });
					return;
				}
			}
		} catch (err) {
			toast.error('Error', { description: 'There was an error analyzing your Pitch Deck' });
			fileStep = { s: 'Something went wrong.', t: 'error' };
			console.error(err);
		} finally {
			//
		}
	}
</script>

<div>
	{#if step == 1}
		<div class="px-10">
			<div class="flex flex-row-reverse items-center justify-between">
				<p class="text-3xl font-extrabold text-green-400">Tandika</p>
				<p class="text-sm font-bold">Step {step} of 2</p>
			</div>
			<div class=" grid w-60 grid-cols-3 gap-2">
				{#each { length: 2 } as s, i}
					<div class="h-1 w-full rounded-md bg-muted" class:bg-primary={i + 1 <= step}></div>
				{/each}
			</div>

			<p class="mt-3 text-5xl font-semibold">
				<span>What do you want visitors to do on your site?</span>
			</p>
		</div>

		<Separator class="my-4" />

		<div class="relative flex h-full w-full flex-row items-start justify-between gap-3">
			<div class="h-full basis-7/12 px-10" in:fade>
				<form class="my-5">
					<div class="my-2 grid grid-cols-3 gap-3">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						{#each _actions as { action, icon, id }}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click={() => {
									if (id == 'contact') {
										return;
									} else {
										if (site.actions.includes(id)) {
											site.actions = site.actions.filter((x) => {
												return x != id;
											});
										} else {
											if (site.actions.length >= 3) {
												toast('You can only select upto 3 actions', { position: 'top-right' });
											} else {
												site.actions = [...site.actions, id];
												toast.dismiss();
											}
										}
									}
								}}
								class:bg-primary={site.actions.includes(id)}
								class:text-primary-foreground={site.actions.includes(id)}
								class:cursor-pointer={id != 'contact'}
								class="flex cursor-pointer flex-col items-center justify-center
						rounded border bg-background px-4 py-5 transition-colors hover:shadow-xl"
							>
								<div class="flex size-9 items-center justify-center rounded-full bg-primary">
									<svelte:component this={icon} class="size-5 text-primary-foreground"
									></svelte:component>
								</div>
								<p class="text-center">{action}</p>
							</div>
						{/each}
					</div>
				</form>

				<div class="flex flex-row justify-between gap-2">
					<Button
						class="hidden"
						variant="outline"
						size="lg"
						on:click={() => {
							step = step - 1;
						}}
					>
						<ArrowLeft class="mr-2 size-4" />
						Previous</Button
					>
					<Button
						class="ml-auto"
						variant="default"
						size="lg"
						on:click={() => {
							step = step + 1;
						}}
						>Continue
						<ArrowRight class="ml-2 size-4" />
					</Button>
				</div>
			</div>

			<div class="basis-5/12" in:fade={{ delay: 200 }}>
				<img src="/vectors/17.svg" class="mx-auto h-[55vh] max-h-[60vh]" alt="" />
			</div>
		</div>
	{:else if step == 2}
		<div class="px-10">
			<div class="flex flex-row-reverse items-center justify-between">
				<p class="text-3xl font-extrabold text-green-400">Tandika</p>
				<p class="text-sm font-bold">Step {step} of 2</p>
			</div>
			<div class=" grid w-60 grid-cols-3 gap-2">
				{#each { length: 2 } as s, i}
					<div class="h-1 w-full rounded-md bg-muted" class:bg-primary={i + 1 <= step}></div>
				{/each}
			</div>

			<p class="mt-3 text-5xl font-semibold">
				<span>Upload your Pitch Deck</span>
			</p>
		</div>

		<Separator class="my-4" />

		<div class="relative flex h-full w-full flex-row items-start justify-between gap-3">
			<div class="h-full basis-7/12 px-10">
				<div class="my-5">
					{#if file}
						<div
							in:fade
							class="my-5 flex min-h-[30vh] w-full flex-col items-center
				justify-center gap-1.5 rounded-md bg-primary text-primary-foreground hover:shadow-sm"
						>
							<FileUp class="size-16 text-muted" />
							<div
								class=" flex flex-row items-center justify-center gap-2 rounded-lg bg-muted/30 px-4 py-2"
							>
								<p class=" font-extrabold text-muted">{file.name}</p>

								<Button
									disabled={uploading}
									variant="destructive"
									class=""
									size="icon"
									on:click={() => {
										file = null;
									}}
								>
									<X class="size-4" />
								</Button>
							</div>
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
					{:else}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							disabled={uploading}
							in:fade
							on:click={() => {
								fileInput.click();
							}}
							class="my-5 flex min-h-[30vh] !w-full cursor-pointer flex-col items-center
			justify-center gap-3 rounded-md border-4 border-dashed border-primary/40 text-primary/40
			shadow-none hover:shadow-sm"
						>
							<CloudUpload class="size-16 text-primary" />
							<p class="text-center font-extrabold">Click here to upload</p>
						</div>
					{/if}
				</div>

				<div class="flex flex-row justify-between gap-2">
					<Button
						disabled={uploading}
						class=""
						variant="outline"
						size="lg"
						on:click={() => {
							step = step - 1;
						}}
					>
						<ArrowLeft class="mr-2 size-4" />
						Previous</Button
					>

					<form on:submit|preventDefault={handleSubmit}>
						<input
							type="file"
							class="hidden"
							name="file"
							accept=".pdf"
							on:change={handleFileSelect}
							bind:this={fileInput}
							id=""
						/>
						<Button
							class=""
							type="submit"
							disabled={file == null || uploading}
							variant="default"
							size="lg"
							on:click={() => {}}
						>
							{#if uploading}
								<Loader class="size-4" />
								Uploading...
							{:else}
								Confirm
								<ArrowRight class="ml-2 size-4" />
							{/if}
						</Button>
					</form>
				</div>
			</div>

			<div class="basis-5/12" in:fade={{ delay: 200 }}>
				<img src="/vectors/15.svg" class="mx-auto h-[55vh] max-h-[60vh]" alt="" />
			</div>
		</div>
	{:else if step == 3}
		<div
			class="relative flex h-full min-h-[60vh] w-full flex-row items-start justify-between gap-3"
		>
			<div
				class="mx-auto my-5 flex size-96 flex-col items-center justify-center gap-3
				 rounded-md border-2 border-primary text-primary shadow-2xl"
			>
				{#if fileStep.t == 'loading'}
					<Loader class="size-10" />
				{:else if fileStep.t == 'error'}
					<span>Error</span>
				{:else if fileStep.t == 'success'}
					<span>Success</span>
				{/if}
				<p class="text-center text-xl font-light">{fileStep.s}</p>
			</div>
		</div>
	{/if}
</div>
