<script>
	import {
		BookOpenIcon,
		ChevronRightIcon,
		MessagesSquareIcon,
		Settings2Icon,
		TabletSmartphoneIcon
	} from 'lucide-svelte';

	export let siteData;
	// $: console.log(siteData.howItWorks);
	let howItWorks = siteData.howItWorks || {
		steps: [
			{
				title: '',
				imageURL: 'null',
				stepNumber: 1,
				description: ''
			},
			{
				title: '',
				imageURL: 'null',
				stepNumber: 2,
				description: ''
			},
			{
				imageURL: 'null',
				description: '',
				stepNumber: 3,
				title: ''
			}
		],
		title: '',
		subtitle: ''
	};

	const dispatch = createEventDispatcher();

	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	import { colorClassOutline } from '$lib/customUtils';
	export let activeSection;
	export let editing = false;
</script>

<!-- {/* Icon Blocks */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="container py-8 lg:py-12
{!editing
		? ''
		: editing && activeSection !== 'howItWorks'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
relative transition-all ease-in
"
	on:click={() => {
		dispatch('select', { section: 'howItWorks' });
	}}
>
	{#if editing && activeSection == 'howItWorks'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
flex-row items-start justify-between gap-2 border-4
border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">How It Works Section</Badge>

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
		<h2 class="text-3xl font-bold lg:text-4xl">{siteData?.howItWorks.title}</h2>
		<p class="mt-3 text-muted-foreground">
			{siteData.howItWorks.subtitle}
		</p>
	</div>
	<div class="mt-5 grid items-center gap-2 sm:grid-cols-2 lg:grid-cols-3">
		{#each siteData.howItWorks.steps as s}
			<!-- {/* Icon Block */} -->
			<div
				class="group relative flex flex-col justify-center rounded-lg border-none p-2
				 shadow hover:bg-[{siteData.primaryColor}] hover:text-[{siteData.primaryColorForeground}] md:p-7"
			>
				<div class="absolute left-2 top-2 z-[-1] flex h-full w-full items-start justify-start">
					<p
						class="shadow-3xl text-xl
					
					font-extrabold
					
					"
						style="color: {siteData.primaryColor}; "
					>
						{s.stepNumber}
					</p>
				</div>
				<div class="">
					<h3 class="text-lg font-semibold">{s.title}</h3>
					<p class="mt-1">{s.description}</p>
				</div>
			</div>
			<!-- {/* End Icon Block */} -->
		{/each}
	</div>
</div>
