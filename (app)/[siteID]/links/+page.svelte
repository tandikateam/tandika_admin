<script>
	// @ts-nocheck

	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Input } from '$lib/components/ui/input';
	import { Plus, Trash } from 'lucide-svelte';
	import { ClipboardCopy } from 'svelte-radix';
	import { getSocialMediaPlatform, isValidUrl } from '$lib/customUtils';
	import { toast } from 'svelte-sonner';
	import { updateDocument } from '$lib/firebaseUtils';
	import { invalidate, invalidateAll } from '$app/navigation';
	import SocialIcons from '$lib/customComponents/SocialIcons.svelte';

	export let data;
	let socials = JSON.parse(JSON.stringify(data?.siteData?.socials)) || [];
	let urlDialog = false;
	// $: console.log(socials);
	let newURL = '';
	let addingLink = false;
</script>

<div class="mx-4 p-4">
	<div class="flex flex-wrap gap-3">
		{#each socials as { url, site }}
			<HoverCard.Root>
				<HoverCard.Trigger
					class="flex size-24 items-center justify-center rounded-md border border-border bg-background"
				>
					<SocialIcons {site} class="size-14" />
				</HoverCard.Trigger>
				<HoverCard.Content>
					<div class="flex flex-row items-center justify-center gap-2">
						<Input type="url" bind:value={url} placeholder="https://" class="max-w-xs" />
						<Button
							variant="ghost"
							on:click={() => {
								toast.loading('Deleting...', { description: 'Removing Link' });
								//delete social
								let _socials = socials.filter((x) => {
									return x.url != url;
								});
								//save URL
								updateDocument('sites', data.siteID, {
									socials: _socials
								})
									.then(() => {
										toast.dismiss();
										socials = [..._socials];
										// Close the dialog and invalidate
										toast.success('Updated', { description: 'Link removed succesfully' });
									})
									.catch((e) => {
										toast.error('Error', { description: 'Something went wrong' });
										console.error(e);
									});
							}}
						>
							<Trash class="size-4" />
						</Button>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
		{/each}

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => {
				urlDialog = true;
			}}
			class="flex size-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-border bg-background"
		>
			<Plus class="size-10" />
		</div>
	</div>
</div>

<Dialog.Root bind:open={urlDialog}>
	<Dialog.Content>
		<Dialog.Header>
			<!-- <Dialog.Title>Are you sure absolutely sure?</Dialog.Title> -->
			<Dialog.Description>
				<div class="py-3">
					<p class="text-center text-lg">New Social Site</p>
					<div class="my-3 flex flex-row gap-2">
						<Input bind:value={newURL} type="url" placeholder="https://" class="" />
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button variant="outline">
									<ClipboardCopy class="size-5" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>Paste</p>
							</Tooltip.Content>
						</Tooltip.Root>

						<Button
							disabled={addingLink}
							on:click={() => {
								addingLink = true;
								if (isValidUrl(newURL)) {
									//Add to Socials
									let _socials = [
										...socials,
										{
											url: newURL,
											site: getSocialMediaPlatform(newURL)
										}
									];
									//save URL
									updateDocument('sites', data.siteID, {
										socials: _socials
									})
										.then(() => {
											socials = [..._socials];
											toast.success('Updated', { description: 'Link added succesfully' });
											urlDialog = false;
											addingLink = false;
											invalidateAll();
										})
										.catch((e) => {
											toast.error('Error', { description: 'Something went wrong' });
											console.error(e);
											addingLink = false;
										});
								} else {
									toast.error('Error', { description: 'Please enter a valid URL' });
									addingLink = false;
								}
							}}
						>
							{#if addingLink}
								<svg
									class="size-5 animate-spin"
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
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
