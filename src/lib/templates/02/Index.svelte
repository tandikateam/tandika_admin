<script>
	//@ts-nocheck
	export let schema;
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import Problem from '../01/Problem.svelte';
	import Hero from './Hero.svelte';
	/**
	 * startupName,
	 * traction,
	 * productFeatures,
	 * ctas,
	 * solution,
	 * primaryColorForeground,
	 * secondaryColor,
	 * footer,
	 * howItWorks,
	 * faqs,
	 * primaryColor,
	 * secondaryColorForeground,
	 * socials,
	 * navigationItems,
	 * hero,
	 * partners,
	 * problem,
	 * contact,
	 * useCases,
	 * testimonials,
	 * team
	 */
</script>

<div class=" w-full px-2">
	<ScrollArea class="h-[91vh] rounded-none  pr-2">
		<!-- <Hero bind:schema /> -->
		<Problem bind:schema />
	</ScrollArea>
</div>
