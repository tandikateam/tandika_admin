<script>
	import { Building2Icon, ThumbsUpIcon, Users2Icon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	export let siteData;
	// $: console.log(siteData.productFeatures);
	$: productFeatures = siteData.productFeatures || {
		features: [
			{
				icon: '',
				description: '',
				title: ''
			},
			{
				icon: 'null',
				description: '',

				title: ''
			},
			{
				description: '',
				icon: 'null',
				title: ''
			}
		],
		title: '',
		subtitle: ''
	};

	const dispatch = createEventDispatcher();

	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	export let activeSection;
	export let editing = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {/* Icon Blocks */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="container bg-muted/20 pb-4 pt-5
{!editing
		? ''
		: editing && activeSection !== 'features'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
relative transition-all ease-in
"
	on:click={() => {
		dispatch('select', { section: 'features' });
	}}
>
	{#if editing && activeSection == 'features'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
flex-row items-start justify-between gap-2 border-4
border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">Features Section</Badge>

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
	<div class="mx-auto max-w-2xl">
		<!-- {/* Grid */} -->
		<div class="grid gap-4">
			<div class="text-center">
				<h2 class="text-3xl font-bold lg:text-4xl">{productFeatures.title}</h2>
				<p class="mt-3 text-muted-foreground">
					{productFeatures.subtitle}
				</p>
			</div>
			<div class="grid grid-cols-2 gap-4">
				{#each productFeatures.features as s}
					<!-- {/* Icon Block */} -->
					<div class="flex rounded-md bg-background px-3 py-6 shadow">
						<div class="ms-5 sm:ms-8">
							<h3 class="text-base font-semibold sm:text-lg">{s.title}</h3>
							<p class="mt-1 text-muted-foreground">
								{s.description}
							</p>
						</div>
					</div>
					<!-- {/* End Icon Block */} -->
				{/each}
			</div>
		</div>
		<!-- {/* End Grid */} -->
	</div>
</div>
