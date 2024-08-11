<script>
	import { Badge } from '$lib/components/ui/badge';
	import * as Tooltip from '$lib/components/ui/tooltip';

	// @ts-nocheck

	import { Button } from '$lib/components/ui/button';
	import { colorClass, colorClassOutline } from '$lib/customUtils';
	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	export let siteData;
	export let activeSection;
	export let editing = false;
	$: hero = siteData.hero || {
		tagline: '',
		heroImageURL: null,
		ctas: [
			{
				title: '',
				type: 'contact',
				content: 'null',
				buttonText: '',
				subtitle: ''
			},
			{
				type: '',
				buttonText: '',
				content: 'null',
				subtitle: '',
				title: ''
			}
		],
		headline: ''
	};
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {/* Hero */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="hero"
	class="relative overflow-hidden py-16
	transition-all ease-in
	{!editing
		? ''
		: editing && activeSection !== 'hero'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
	lg:py-20"
	on:click={() => {
		dispatch('select', { section: 'hero' });
	}}
>
	{#if editing && activeSection == 'hero'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
			flex-row items-start justify-between gap-2 border-4 border-dashed border-primary
			bg-muted bg-opacity-20 px-4 pt-2 blur-none"
		>
			<Badge>Hero Section</Badge>
			<Button
				size="lg"
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
			class="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r
			from-background/50 to-background blur-3xl"
		/>
		<div
			class="h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem]
			-rotate-12 rounded-full bg-gradient-to-tl from-primary-foreground
			via-primary-foreground to-background blur-3xl"
		/>
	</div>
	<!-- {/* End Gradients */} -->
	<div class="relative z-10">
		<div class="container py-10 lg:py-16">
			<div class="mx-auto max-w-2xl text-center">
				<!-- {/* Title */} -->
				<div class="mt-5 max-w-2xl">
					<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{hero.headline}
					</h1>
				</div>
				<!-- {/* End Title */} -->
				<div class="mt-5 max-w-3xl">
					<p class="text-xl text-muted-foreground">
						{hero.tagline}
					</p>
					<!-- <p>
						{colorClass(siteData.primaryColor, siteData.primaryColorForeground)}
					</p> -->
				</div>
				<!-- {/* Buttons */} -->
				<div class="mt-8 flex justify-center gap-3">
					{#each hero.ctas as cta, i}
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									size="lg"
									style="
							background-color: {siteData.primaryColor};
							 color: {siteData.primaryColorForeground};">{cta.buttonText}</Button
								>
							</Tooltip.Trigger>
							<Tooltip.Content>
								{#if cta.type == 'contact'}
									<p>On click, user will be prompted to fill in a contact form.</p>
								{/if}
							</Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>
				<!-- {/* End Buttons */} -->
			</div>
		</div>
	</div>
</div>
