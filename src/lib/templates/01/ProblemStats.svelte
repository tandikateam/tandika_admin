<script>
	// @ts-nocheck

	import {
		BookOpenIcon,
		MessagesSquareIcon,
		Settings2Icon,
		TabletSmartphoneIcon
	} from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';

	export let siteData;
	// $: console.log(siteData.problemStats);
	$: problemStats = siteData.problemStats || [
		{
			stat: '',
			stat_description: ''
		}
	];
	const dispatch = createEventDispatcher();

	import { Button } from '$lib/components/ui/button';
	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	import { colorClass } from '$lib/customUtils';
	export let activeSection;
	export let editing = false;
</script>

<!-- {/* Icon Blocks */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="container relative pb-4 transition-all ease-in lg:pb-8
	


{!editing
		? ''
		: editing && activeSection !== 'problemStats'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
"
	style="background-color: {siteData.primaryColor}; "
	on:click={() => {
		dispatch('select', { section: 'problemStats' });
	}}
>
	{#if editing && activeSection == 'problemStats'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
	flex-row items-start justify-between gap-2 border-4
	border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">Problem Statistics Section</Badge>

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

	<div class="grid items-center gap-0 sm:grid-cols-1 lg:grid-cols-3">
		<!-- {/* Icon Block */} -->
		{#each problemStats as p}
			<Card.Root
				class="h-max border-none  bg-transparent py-2 shadow-none"
				style="color: {siteData.primaryColorForeground}"
			>
				<Card.Header>
					<Card.Title></Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="">
						<p class="text-center text-4xl font-extrabold">{p.stat}</p>
						<p class="mt-1 text-center text-sm">{p.stat_description}</p>
					</div>
				</Card.Content>
				<Card.Footer></Card.Footer>
			</Card.Root>
		{/each}
		<!-- {/* End Icon Block */} -->
	</div>
</div>
<!-- {/* End Icon Blocks */} -->
