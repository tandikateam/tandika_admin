<script lang="ts">
	// @ts-nocheck

	import * as Card from '$lib/components/ui/card';
	import { Image, PresentationIcon, StoreIcon } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	export let siteData;
	// let team = siteData?.team;
	// $: team = siteData.team || {
	// 	title: '',
	// 	subtitle: '',
	// 	members: [
	// 		{
	// 			name: '',
	// 			contacts: [
	// 				{
	// 					value: '',
	// 					platform: ''
	// 				}
	// 			],
	// 			imageURL: '',
	// 			bio: '',
	// 			position: ''
	// 		}
	// 	]
	// };
	// $: console.log(team);

	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	import { uploadFile } from '$lib/firebaseUtils';
	import { toast } from 'svelte-sonner';
	import { invalidate } from '$app/navigation';
	export let activeSection;
	export let editing = false;
	const dispatch = createEventDispatcher();
	let imageInput: HTMLInputElement;
	let file: { name: any } | null;
	let activeTeamIndex = null;
</script>

<input
	type="file"
	bind:this={imageInput}
	on:change={async () => {
		let f = event.target.files[0];
		if (f) {
			toast.loading('Uploading your image...');
			let x = await uploadFile(f, `images`);
			siteData.team.members[activeTeamIndex].imageURL = x;
			toast.dismiss();
			toast('Successfully updated');
		} else {
			return;
		}
	}}
	accept=".png,.jpg,.jpeg,.webp"
	class="hidden"
	id="fileInput"
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {/* Icon Blocks */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="container py-10 lg:py-16
{!editing
		? ''
		: editing && activeSection !== 'team'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
relative transition-all ease-in
"
	on:click={() => {
		dispatch('select', { section: 'team' });
	}}
>
	{#if editing && activeSection == 'team'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
flex-row items-start justify-between gap-2 border-4
border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">Team Section</Badge>

			<Button
				size="lg"
				class="shadow-2xl"
				variant="default"
				on:click={(e) => {
					e.stopPropagation();
					//deselect
					dispatch('deselect', {});
				}}
			>
				<MousePointerClick class="mr-2 size-6" />
			</Button>
		</div>
	{/if}

	<div>
		<h2 class="text-3xl font-bold lg:text-4xl">{siteData.team.title}</h2>
		<p class="mt-3 text-muted-foreground">
			{siteData.team.subtitle}
		</p>
	</div>
	<div class="mt-5 grid items-center gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-2">
		{#each siteData.team.members || [] as t, i (t.name)}
			<!-- {/* Card. */} -->
			<Card.Root>
				<Card.Header class="flex-row items-center gap-4 pb-4">
					<!-- svelte-ignore missing-declaration -->
					{#if editing}
						<!-- svelte-ignore missing-declaration -->
						<div
							class="z-[50]"
							on:click={() => {
								if (editing) {
									activeTeamIndex = i;

									imageInput.click();
								}
							}}
						>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Avatar.Root class="size-16 transition-all ease-in hover:scale-125">
										<Avatar.Image src={t.imageURL} alt={t.name} />
										<Avatar.Fallback>{t.name[0]}</Avatar.Fallback>
									</Avatar.Root>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>Click to Update Image</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</div>
					{:else}
						<Avatar.Root class="z-[50] size-16">
							<Avatar.Image src={t.imageURL} alt={t.name} />
							<Avatar.Fallback>{t.name[0]}</Avatar.Fallback>
						</Avatar.Root>
					{/if}

					<Card.Title>
						<p class="text-xl">{t.name}</p>
						<p class="text-base font-normal">{t?.position || ''}</p>
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="text-sm">
						{t.bio}
					</div>
				</Card.Content>
			</Card.Root>
			<!-- {/* End Card. */} -->
		{/each}
	</div>
</div>
<!-- {/* End Icon Blocks */} -->
