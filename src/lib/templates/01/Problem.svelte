<script>
	// import { Button } from '$lib/components/ui/button';
	import {
		BookOpenIcon,
		ChevronRightIcon,
		CircleDot,
		MessagesSquareIcon,
		ThumbsUpIcon
	} from 'lucide-svelte';
	export let siteData;
	let problem = siteData.problem || {
		title: '',
		subtitle: '',
		problems: [
			{
				description: '',
				title: '',
				imageURL: 'null',
				stat: null,
				stat_description: null
			}
		]
	};
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- {/* Icon Blocks */} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="container relative pb-5 pt-16
transition-all ease-in lg:pt-20
{!editing
		? ''
		: editing && activeSection !== 'problem'
			? 'cursor-pointer opacity-40 backdrop-grayscale hover:scale-105'
			: 'cursor-default '}
"
	on:click={() => {
		dispatch('select', { section: 'problem' });
	}}
>
	{#if editing && activeSection == 'problem'}
		<div
			in:fade
			class="absolute left-0 top-0 z-[30] flex h-full w-full
	flex-row items-start justify-between gap-2 border-4
	border-dashed border-primary bg-muted bg-opacity-20 px-4 pt-2 shadow blur-none"
		>
			<Badge class="shadow-2xl">Problem Section</Badge>

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

	<!-- {/* Grid */} -->
	<div class="grid gap-5 md:grid-cols-2">
		<div class="lg:w-3/4">
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{problem.title}
			</h2>
			<p class="mt-3 text-muted-foreground">
				{problem.subtitle}
			</p>
			<!-- <p class="mt-5">
				<a
					class="group inline-flex items-center gap-x-1 font-medium underline-offset-4 hover:underline"
					href="##"
				>
					Contact sales to learn more
					<ChevronRightIcon
						class="h-4 w-4 flex-shrink-0 transition ease-in-out group-hover:translate-x-1"
					/>
				</a>
			</p> -->
		</div>
		<!-- {/* End Col */} -->
		<div class="space-y-6 lg:space-y-10">
			<!-- {/* Icon Block */} -->
			{#each problem.problems as p}
				<div class="flex">
					<!-- {/* Icon */} -->
					<span
						class="inline-flex h-[46px] w-[46px] flex-shrink-0 items-center
						justify-center rounded-full border-none"
						style="
						background-color: {siteData.primaryColor};
						 color: {siteData.primaryColorForeground};"
					>
						<CircleDot class="h-5 w-5 flex-shrink-0" />
					</span>
					<div class="ms-5 sm:ms-8">
						<h3 class="text-base font-semibold sm:text-lg">{p.title}</h3>
						<p class="mt-1 text-muted-foreground">
							{p.description}
						</p>
					</div>
				</div>
			{/each}
			<!-- {/* End Icon Block */} -->
		</div>
		<!-- {/* End Col */} -->
	</div>
	<!-- {/* End Grid */} -->
</div>
<!-- {/* End Icon Blocks */} -->
