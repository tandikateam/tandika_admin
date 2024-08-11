<script>
	import { Button } from '$lib/components/ui/button';
	import { BentoGrid, BentoGridItem } from '$lib/components/ui/BentoGrid';
	export let siteData;
	$: testimonials = siteData.testimonials || {
		subtitle: '',
		quotes: [
			{
				author: '',
				quote: '',
				imageURL: 'null'
			}
		],
		title: ''
	};
	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	export let activeSection;
	export let editing = false;
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {/* Hero */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="relative overflow-hidden py-4 lg:py-8
{!editing
		? ''
		: editing && activeSection !== 'testimonials'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
relative transition-all ease-in

"
	on:click={() => {
		dispatch('select', { section: 'testimonials' });
	}}
>
	{#if editing && activeSection == 'testimonials'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
flex-row items-start justify-between gap-2 border-4
border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">Testimonials Section</Badge>
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
	<!-- {/* Gradients */} -->
	<div aria-hidden="true" class="absolute -top-96 start-1/2 flex -translate-x-1/2 transform">
		<div
			class="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-b from-background/50 to-background blur-3xl"
		/>
		<div
			class="h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 rounded-full bg-gradient-to-br from-primary-foreground via-primary-foreground to-background blur-3xl"
		/>
	</div>
	<!-- {/* End Gradients */} -->
	<div class="relative z-10">
		<div class="container py-8 lg:py-10">
			<div class="mx-auto max-w-3xl text-center">
				<p class="text-2xl font-extrabold tracking-tight lg:text-3xl">{testimonials.title}</p>
				<p class="text-xl font-normal tracking-tight lg:text-xl">{testimonials.subtitle}</p>
			</div>

			<div class="mt-5 grid grid-cols-2 gap-2">
				{#each testimonials.quotes as q}
					<div class="h-min rounded-md bg-background px-4 py-6 shadow">
						<p class="text-base">
							<span class="mr-1 text-5xl font-extrabold text-primary">"</span>
							{q.quote}
						</p>
						<div class="mt-1 flex flex-col items-end justify-end">
							<p class="text-sm font-semibold">~ {q.author}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
