<script>
	import * as Accordion from '$lib/components/ui/accordion';
	export let siteData;
	$: faqs = siteData.faqs || {
		title: '',
		faqs: [
			{
				answer: '',
				question: ''
			}
		],
		subtitle: ''
	};
	import { MousePointerClick } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	export let activeSection;
	export let editing = false;
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {/* faqs */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="container py-6 lg:py-10
{!editing
		? ''
		: editing && activeSection !== 'faqs'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
relative transition-all ease-in

"
	on:click={() => {
		dispatch('select', { section: 'faqs' });
	}}
>
	{#if editing && activeSection == 'faqs'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
flex-row items-start justify-between gap-2 border-4
border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">FAQs Section</Badge>

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
		<h2 class="text-3xl font-bold lg:text-4xl">{faqs.title}</h2>
		<p class="mt-3 text-muted-foreground">
			{faqs.subtitle}
		</p>
	</div>

	<div class="my-4">
		{#each faqs.faqs as f, i}
			<Accordion.Root>
				<Accordion.Item value="item-{i + 1}">
					<Accordion.Trigger>{f.question}</Accordion.Trigger>
					<Accordion.Content>
						{f.answer}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		{/each}
	</div>
</div>
