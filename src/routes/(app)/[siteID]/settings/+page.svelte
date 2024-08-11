<script lang="ts">
	//@ts-nocheck
	export let data;
	// $: console.log(data);
	let siteData = JSON.parse(JSON.stringify(data.siteData));

	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Toggle } from '$lib/components/ui/toggle';
	import { updateDocument, checkAvailability, uploadFile } from '$lib/firebaseUtils';
	import { ClipboardCopy, Power, PowerOff, Check, Ban, CircleDashed } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { invalidate, invalidateAll } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Switch } from '$lib/components/ui/switch';

	/**
	 * Startup Name
	 * Subdomain
	 * Summary
	 * Active Status
	 * Delete
	 * Favicon
	 */

	// $: console.log(siteData);

	let updatingStatus = false;
	let updating = false;
	let subDomainAvailability: any = null;
	let validateSubdomain = '';

	//
	function cleanString(str: string) {
		str = str.toLowerCase();
		str = str.replace(/[^a-z0-9]/g, '');
		str = str.trim();
		return str;
	}

	let fileinput;

	const onFileSelected = async (e: any) => {
		let image = e.target.files[0];
		updating = true;
		toast.loading('Uploading...', { description: 'Uploading your Logo...' });
		uploadFile(image, 'logos')
			.then((url) => {
				updateDocument('sites', data.siteID, { startup_logo: url })
					.then(() => {
						invalidateAll();
						siteData.startup_logo = url;
						toast.dismiss();
						toast.success('Success', { description: 'Logo updated succesfully!' });
					})
					.catch((err) => {
						toast.dismiss();
						// updatingStatus = false;
						toast.error('Error Updating', { description: 'Something went wrong!' });
						console.error(err);
					});
			})
			.catch((err) => {
				toast.dismiss();
				console.error(err);
				toast.error('Error Uploading', { description: 'Something went wrong!' });
			});
		updating = false;

		// let reader = new FileReader();
		// reader.readAsDataURL(image);
		// reader.onload = (e) => {
		// 	siteData.startup_logo = e.target.result;
		// };
	};
</script>

{#if !siteData}
	<div class="flex min-h-[80vh] flex-col items-center justify-center gap-2">
		<p>No site found</p>
		<Button>Create a new site</Button>
	</div>
{:else}
	<!-- <div>
		<p>
			{JSON.stringify(data.siteData) == JSON.stringify(siteData)}
		</p>
	</div>
	<div class="grid grid-cols-2 gap-5">
		<pre>
		{JSON.stringify(data.siteData, undefined, 2)}
	</pre>
		<pre>
		{JSON.stringify(siteData, undefined, 2)}
	</pre>
	</div> -->

	<main class="pl-2">
		<!-- startup logo  -->

		<input
			style="display:none"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
		/>

		<div class="flex flex-row items-center justify-between px-5 py-5">
			<div class="flex flex-row items-center gap-5">
				{#if siteData.startup_logo}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						class="size-16 rounded-md"
						on:click={() => {
							fileinput.click();
						}}
						src={siteData.startup_logo}
						alt="isd"
					/>
				{:else}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="size-16 rounded-md bg-muted"
						on:click={() => {
							fileinput.click();
						}}
					></div>
				{/if}
				<div>
					<p class="text-lg font-semibold">Settings</p>
					<p>Configure your Tandiika Site.</p>
				</div>
			</div>
		</div>
		<Separator />

		<div class="flex min-h-[75vh] flex-row gap-0">
			<div class="basis-3/4">
				<form class="flex flex-col gap-4">
					<div class="flex flex-row items-center justify-center gap-3 border-b p-5">
						<div class="basis-2/12">
							<p class="font-semibold text-primary">Startup Name</p>
						</div>
						<div class="basis-10/12">
							<Input placeholder="Startup Name" maxlength={44} bind:value={siteData.startup_name} />
						</div>
					</div>
					<div class="flex flex-row items-center justify-start gap-3 border-b p-5">
						<div class="basis-2/12">
							<p class="font-semibold text-primary">Subdomain</p>
						</div>
						<div class="flex basis-9/12 flex-row gap-0">
							<Input
								disabled
								placeholder="Startup Name"
								value="https://www.tandiika.com/"
								class="border-r-none rounded-r-none
											disabled:bg-primary
											disabled:text-primary-foreground"
							/>

							<Input
								maxlength={28}
								placeholder="Startup Subdomain"
								bind:value={siteData.subdomain}
								on:keyup={async () => {
									updating = true;
									siteData.subdomain = cleanString(siteData.subdomain);
									if (siteData.subdomain == data?.siteData?.subdomain) {
										subDomainAvailability = null;
									} else {
										subDomainAvailability = await checkAvailability(siteData.subdomain);
									}
									updating = false;
								}}
								class="border-l-none rounded-l-none"
							/>

							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button
										class="ml-2"
										variant="outline"
										on:click={() => {
											navigator.clipboard
												.writeText(`https://www.tandika.com/${siteData.subdomain}`)
												.then(() => {
													//   console.log('Text copied to clipboard');
													toast('URL copied');
												})
												.catch((error) => {
													console.error('Error copying text: ', error);
												});
										}}
									>
										<ClipboardCopy class="size-4" />
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>Copy URL</p>
								</Tooltip.Content>
							</Tooltip.Root>

							<Button variant="ghost" class="ml-2">
								{#if updating}
									<svg
										class="size-4 animate-spin"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								{:else if subDomainAvailability === null}
									<CircleDashed class="size-4" />
								{:else if subDomainAvailability === true}
									<Check class="size-4" />
								{:else if subDomainAvailability === false}
									<Ban class="size-4" />
								{/if}
							</Button>
						</div>
					</div>

					<div class="flex flex-row items-center justify-center gap-3 border-b px-5 pb-5 pt-3">
						<div class="basis-2/12">
							<p class="font-semibold text-primary">Startup Bio</p>
						</div>
						<div class="flex basis-10/12 flex-row gap-0">
							<Textarea placeholder="Startup Bio" rows={8} bind:value={siteData.summary}></Textarea>
						</div>
					</div>
				</form>
				<div class="flex justify-end px-5 py-5">
					<Button
						disabled={JSON.stringify(data.siteData) === JSON.stringify(siteData) ||
							updatingStatus ||
							updating}
						on:click={() => {
							//
							updatingStatus = true;
							if (subDomainAvailability == false) {
								toast.error('Subdomain Unavailable', {
									description: 'Please choose another subdomain as this one is taken'
								});
							} else {
								// Update
								updateDocument('sites', data.siteID, {
									startup_name: siteData.startup_name,
									subdomain: siteData.subdomain,
									summary: siteData.summary
								})
									.then(() => {
										updatingStatus = false;
										toast.success('Success', {
											description: 'Site updated successfully!'
										});
										invalidateAll();
									})
									.catch((e) => {
										console.error(e);
										updatingStatus = false;
									});
							}
						}}
					>
						{#if updatingStatus}
							<svg
								class="size-4 animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						{:else}
							Save
						{/if}
					</Button>
				</div>
			</div>

			<div class="flex basis-1/4 flex-col gap-0 border-l">
				<!-- Active or nah -->

				<div class="flex flex-row items-start justify-between gap-2 border-b px-4 py-5">
					<span class="text-sm font-normal"> Active Status: </span>
					<Switch
						disabled={updatingStatus}
						bind:checked={siteData.active}
						onCheckedChange={(e) => {
							// updatingStatus = true;
							// Update site status
							toast.loading('Updating...', {
								description: 'Please wait while we save your changes'
							});
							updateDocument('sites', data.siteID, { active: e })
								.then(() => {
									// invalidateAll().then(() => {
									toast.dismiss();
									toast.success('Success', {
										description: `Your Tandiika Site is now ${siteData.active ? 'online' : 'offline'}!`
									});
									// updatingStatus = false;
									// });
								})
								.catch((err) => {
									toast.dismiss();
									// updatingStatus = false;
									toast.error('Error', { description: 'Something went wrong' });
									console.error(err);
								});
						}}
					/>
				</div>

				<!-- Delete Card -->
				<div
					class="flex w-full flex-col items-start justify-between gap-2 rounded-md rounded-t-none
					 bg-destructive/10 px-4 py-5 text-destructive"
				>
					<div>
						<p class=" font-semibold">Delete your Site</p>
						<p>This action cannot be undone</p>
					</div>

					<Dialog.Root>
						<Dialog.Trigger>
							<Button variant="destructive" class="w-full">Delete</Button>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
								<Dialog.Description>
									<p class="py-3">
										Enter your subdomain <span class="font-extrabold text-destructive"
											>{siteData.subdomain}</span
										> to delete this site.
									</p>
									<Input bind:value={validateSubdomain} />
									<Separator />
									<div class="flex justify-end py-3">
										<Button
											disabled={validateSubdomain !== siteData.subdomain}
											on:click={() => {
												//Delete site
												//Remove from user sites
											}}
										>
											Confirm and Delete
										</Button>
									</div>
								</Dialog.Description>
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
		</div>
	</main>
{/if}
