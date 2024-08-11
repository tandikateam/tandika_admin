<script>
	// @ts-nocheck

	import {
		Building2Icon,
		ThumbsUpIcon,
		Users2Icon,
		BriefcaseIcon,
		FlowerIcon,
		HeartIcon,
		LightbulbIcon,
		MountainSnow,
		SearchIcon,
		SettingsIcon
	} from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let siteData;
	// $: console.log(siteData.contact);
	let mainContact = siteData.mainContact;

	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	import { colorClass, colorClassOutline } from '$lib/customUtils';
	export let activeSection;
	export let editing = false;
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {/* Hero */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="relative overflow-hidden
{!editing
		? ''
		: editing && activeSection !== 'contact'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
 transition-all ease-in
"
	style="background-color: {siteData.primaryColor}; color: {siteData.primaryColorForeground};"
	on:click={() => {
		dispatch('select', { section: 'contact' });
	}}
>
	{#if editing && activeSection == 'contact'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
flex-row items-start justify-between gap-2 border-4
border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">Contact Section</Badge>

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

	<div class="container py-6 lg:py-10">
		<div class="text-center">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{mainContact.title}
			</h1>
			<p class="mt-3 text-xl">
				{mainContact.subtitle}
			</p>

			<div class=" mx-auto mt-7 flex max-w-xl items-center justify-center sm:mt-5">
				<Button class={colorClassOutline(siteData.primaryColor, siteData.primaryColorForeground)}
					>Contact Us</Button
				>
			</div>
		</div>
	</div>
</div>
<!-- {/* End Hero */} -->
